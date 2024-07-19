// import {currentUser} from "@clerk/nextjs";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // const user = await currentUser();
    // const user = await "1";
    const session = await auth();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;
    // if (!user || !user.id || !user.emailAddresses?.[0]?.emailAddress)
    if (!session || !userId || !userEmail) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          // userId: "1",
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already purchased", { status: 400 });
    }

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: course.title,
            description: course.description!,
          },
          unit_amount: Math.round(course.price! * 100),
        },
      },
    ];

    let stripeCustomer = await db.stripeCustomer.findUnique({
      where: {
        userId: userId,
        // userId: "1",
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const customer = await stripe.customers.create({
        // email: user.emailAddress[0].emailAddress,
        email: userEmail,
      });
      stripeCustomer = await db.stripeCustomer.create({
        data: {
          userId: userId,
          // userId: "1",
          stripeCustomerId: customer.id,
        },
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      customer: stripeCustomer.stripeCustomerId,
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: userId,
        // userId: "1",
      },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("[COURSE_ID_CHECKOUT]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
