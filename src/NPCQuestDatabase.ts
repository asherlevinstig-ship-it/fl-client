// NPCQuestDatabase.ts

export const NPC_QUEST_DB: Record<string, any> = {
    "protector_1_wolves": {
        title: "Culling the Pack",
        dialogue: "Greetings, <span class='hud-key'>Traveler</span>. The local wildlife is growing increasingly hostile. Cull their numbers, and the town will reward you.",
        objectives: [{ requiredAmount: 5 }],
        rewards: { coins: 250, exp: 500 }
    },
    "protector_2_scout": {
        title: "Reconnaissance",
        dialogue: "We need eyes on the perimeter. Venture out and confirm the state of the Labyrinth gates.",
        objectives: [{ requiredAmount: 1 }],
        rewards: { coins: 150, exp: 300 }
    }
};