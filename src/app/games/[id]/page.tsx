// Metadata ใช้ระบุ Type ของข้อมูลชื่อแท็บ
import type { Metadata } from "next";
// Link ใช้สร้างปุ่มกลับไปหน้ารายการเกม
import Link from "next/link";
// notFound ใช้สั่งให้ Next.js แสดงหน้า 404
import { notFound } from "next/navigation";
// games คือข้อมูลที่ใช้ค้นหาเกมตาม id
import { games } from "@/data/games";

// params คือ id ที่ Next.js อ่านจาก URL /games/[id]
type GamePageProps = {
  params: Promise<{ id: string }>;
};

// กำหนดชื่อแท็บตามชื่อเกมที่เปิดอยู่
export async function generateMetadata(
  { params }: GamePageProps
): Promise<Metadata> {
  //await params: รออ่านรหัส id ที่ส่งมาจาก URL
  const { id } = await params;
  // find() หาเกมตัวแรกที่ id ตรงกับ URL
  const game = games.find((item) => item.id === id);

  // คืนค่า title เพื่อแสดงบนชื่อแท็บเบราว์เซอร์
  return {
    title: game ? game.title : "ไม่พบเกม",
  };
}
//ดึง id และค้นหาเกม: อ่าน id จาก URL แล้วใช้ .find() ค้นหาข้อมูลเกมที่ตรงกัน
export default async function GameDetailPage({ params }: GamePageProps) {
  // อ่าน id จาก URL ปัจจุบัน
  const { id } = await params;

  // find() ค้นหาเกมตัวแรกที่มี id ตรงกับ id ใน URL
  const game = games.find((item) => item.id === id);
  
  // ถ้าไม่มีข้อมูลเกม ให้ Next.js แสดงหน้า 404
  if (!game) {
    notFound();
  }

  return (
    // main ครอบเนื้อหาหลักของหน้ารายละเอียด
    <main className="page gameDetailPage">
      {/* Link กลับไปหน้ารายการเกม */}
      <Link className="gameBackLink" href="/games">
        ← กลับไปหน้าเกม
      </Link>

      {/* article แสดงข้อมูลของเกมที่ find() พบ */}
      <article className="gameDetailCard">
        {/* ข้อความบอกหมวดของหน้า */}
        <p className="eyebrow">GAME DETAIL</p>
        {/* แสดงชื่อเกม */}
        <h1>{game.title}</h1>
        {/* แสดงข้อมูลแต่ละ field ของเกม */}
        <p>แพลตฟอร์ม: {game.platform}</p>
        <p>ชั่วโมงที่คาดว่าจะเล่น: {game.hours} ชั่วโมง</p>
        <p>สถานะ: {game.status}</p>
      </article>
    </main>
  );
}
