// Link ใช้สร้างลิงก์ไปหน้ารายละเอียดเกม
import Link from "next/link";
// Game คือ Type ของข้อมูลเกมที่ GameCard ต้องรับ
import type { Game } from "@/types/game";

// กำหนด Props ที่ GameCard ต้องรับจาก GameExplorer
type GameCardProps = {
  // Object เกมหนึ่งรายการ
  game: Game;
  // ฟังก์ชันส่ง id กลับไปเริ่มแก้ไข
  onEdit: (id: string) => void;
  // ฟังก์ชันส่ง id กลับไปลบเกม
  onDelete: (id: string) => void;
};

// แสดงข้อมูลของเกมหนึ่งรายการ
export default function GameCard({ game, onEdit, onDelete }: GameCardProps) {
  // return ส่ง JSX การ์ดเกมหนึ่งใบกลับไปให้ GameExplorer
  return (
    // article ครอบข้อมูลเกมหนึ่งเกม
    <article className="gameCard">
      {/* แสดงแพลตฟอร์ม เช่น PC หรือ PlayStation 5 */}
      <p className="gamePlatform">{game.platform}</p>
      <h2>
        {/* Link นำผู้ใช้ไปหน้า /games/id ของเกมปัจจุบัน */}
        <Link href={`/games/${game.id}`}>{game.title}</Link>
      </h2>
      {/* แสดงจำนวนชั่วโมงที่อ่านจาก Object game */}
      <p>คาดว่าจะเล่น {game.hours} ชั่วโมง</p>
      {/* แสดงสถานะปัจจุบันของเกม */}
      <p className="gameStatus">สถานะ: {game.status}</p>

      {/* div ครอบปุ่มแก้ไขและลบ */}
      <div className="gameCardActions">
        {/* ส่ง id เกมกลับไปให้ handleEdit เมื่อผู้ใช้คลิก */}
        <button type="button" onClick={() => onEdit(game.id)}>
          แก้ไข
        </button>
        {/* ส่ง id เกมกลับไปให้ handleDelete เมื่อผู้ใช้คลิก */}
        <button type="button" onClick={() => onDelete(game.id)}>
          ลบ
        </button>
      </div>
    </article>
  );
}
