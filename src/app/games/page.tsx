// Metadata ใช้กำหนดชื่อแท็บของหน้า /games
import type { Metadata } from "next";
// GameExplorer คือ Client Component ที่จัดการการเพิ่ม แก้ไข และลบเกม
import GameExplorer from "@/components/GameExplorer";
// games คือ Array ข้อมูลเริ่มต้นที่แยกไว้ในไฟล์ data
import { games } from "@/data/games";

//ผู้ใช้จะเห็นชื่อแท็บติดอยู่ชัดเจนว่า "Game Backlog"
// กำหนดชื่อแท็บของหน้ารายการเกม
export const metadata: Metadata = {
  title: "Game Backlog",
};

// หน้า /games เป็น Server Component ที่ส่งข้อมูลเริ่มต้นให้ GameExplorer
export default function GamesPage() {
  // return ส่งโครงสร้างหน้า /games ให้ Next.js แสดงผล
  return (
    // main ครอบเนื้อหาหลักของหน้า
    <main className="page gamesPage">
      {/* header แสดงหัวข้อและคำอธิบายของหน้า */}
      <header className="gamesHeader">
        {/* ข้อความหมวดหมู่ขนาดเล็ก */}
        <p className="eyebrow">GAME BACKLOG</p>
        {/* หัวข้อหลัก */}
        <h1>เกมที่ตั้งใจจะเล่น</h1>
        {/* คำอธิบายสิ่งที่หน้าเว็บนี้จัดเก็บ */}
        <p className="pageDescription">
          บันทึกรายการเกม แพลตฟอร์ม ชั่วโมงที่คาดว่าจะเล่น และสถานะของเกม
        </p>
      </header>

      {/* ส่งข้อมูลเริ่มต้นให้ GameExplorer ผ่าน Props */}
      <GameExplorer games={games} />
    </main>
  );
}
