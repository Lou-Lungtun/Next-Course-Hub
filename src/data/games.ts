import type { Game } from "@/types/game";

// ข้อมูลเริ่มต้นสำหรับแสดงในหน้า Game Backlog
export const games: Game[] = [
  // Object แต่ละก้อนคือข้อมูลเกมหนึ่งรายการ
  { id: "hades", title: "Hades", platform: "PC", hours: 25, status: "กำลังเล่น" },
  // เกมที่สองในข้อมูลเริ่มต้น
  { id: "stardew-valley", title: "Stardew Valley", platform: "Nintendo Switch", hours: 50, status: "ยังไม่เริ่ม" },
  // เกมที่สามในข้อมูลเริ่มต้น
  { id: "elden-ring", title: "Elden Ring", platform: "PlayStation 5", hours: 60, status: "ยังไม่เริ่ม" },
  // เกมที่สี่ในข้อมูลเริ่มต้น
  { id: "hollow-knight", title: "Hollow Knight", platform: "PC", hours: 30, status: "เล่นจบแล้ว" },
  // เกมที่ห้าในข้อมูลเริ่มต้น
  { id: "the-legend-of-zelda", title: "The Legend of Zelda: Tears of the Kingdom", platform: "Nintendo Switch", hours: 55, status: "ยังไม่เริ่ม" },
];
