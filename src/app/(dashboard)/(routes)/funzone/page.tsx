"use client";

import ActivitiesList from "@/components/ActivitiesList";
import { Suspense } from "react";
import jumpObstacles from "@/assets/jumpObstacles.png";
import keyboardDrum from "@/assets/keyboardDrum.png";
import bubbleGame from "@/assets/bubbleGame.png";

const activities = [
  {
    id: "1",
    title: "Jump obstacles",
    imageUrl: jumpObstacles,
    category: "game",
  },
  {
    id: "2",
    title: "Keyboard drum",
    imageUrl: keyboardDrum,
    category: "music",
  },
  {
    id: "3",
    title: "Bubble game",
    imageUrl: bubbleGame,
    category: "game",
  },
];

function FunZonePage() {
  return (
    <>
      <Suspense
        fallback={
          <div className="flex justify-center align-middle">Loading...</div>
        }
      >
        <div className="p-6 space-y-4">
          <ActivitiesList items={activities} />
        </div>
      </Suspense>
    </>
  );
}

export default FunZonePage;
