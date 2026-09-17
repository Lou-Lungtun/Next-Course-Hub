"use client";

// useState ใช้เก็บข้อมูลเกมที่เปลี่ยนได้บนหน้าเว็บ
import { useState } from "react";
// Game คือ Type ของข้อมูลเกมหนึ่งรายการ
import type { Game } from "@/types/game";
// GameCard ใช้แสดงเกมทีละใบ
import GameCard from "@/components/GameCard";
// GameForm ใช้รับข้อมูลเพิ่มและแก้ไขเกม
import GameForm, { type GameDraft } from "@/components/GameForm";

// กำหนดว่า GameExplorer ต้องรับ Array เกมจากหน้า /games
type GameExplorerProps = {
  // games คือข้อมูลเกมตั้งต้น
  games: Game[];
};

// Component หลักสำหรับจัดการการเพิ่ม แก้ไข และลบเกม
export default function GameExplorer({ games: initialGames }: GameExplorerProps) {
  // gameList คือรายการเกมที่เปลี่ยนได้เมื่อเพิ่ม แก้ไข หรือลบ
  const [gameList, setGameList] = useState<Game[]>(initialGames);
  // editingId เก็บ id ของเกมที่กำลังแก้ไข หรือ null ถ้ายังไม่ได้แก้ไขเกมใด
  const [editingId, setEditingId] = useState<string | null>(null);
  // isFormOpen ควบคุมว่าจะแสดงฟอร์มหรือซ่อนฟอร์ม
  const [isFormOpen, setIsFormOpen] = useState(false);

  // หาเกมที่กำลังแก้ไข เพื่อนำข้อมูลเดิมกลับไปแสดงในฟอร์ม
  const editingGame = gameList.find((game) => game.id === editingId);

  // รับข้อมูลจาก GameForm หลังผ่าน Validation แล้ว
  function handleSave(draft: GameDraft) {
    // ถ้า editingId เป็น null หมายถึงกำลังเพิ่มเกมใหม่
    if (editingId === null) {
      // สร้าง Object เกมใหม่จากข้อมูลที่ผู้ใช้กรอก
      const newGame: Game = {
        // randomUUID() สร้าง id ที่ไม่ซ้ำกันให้เกมใหม่
        id: crypto.randomUUID(),
        // trim() ตัดช่องว่างหน้าและหลังชื่อเกม
        title: draft.title.trim(),
        platform: draft.platform,
        // ค่าจาก input เป็นข้อความ จึงแปลงเป็น number ก่อนเก็บ
        hours: Number(draft.hours),
        status: draft.status,
      };

      // สร้าง Array ใหม่โดยเก็บเกมเดิมและเพิ่มเกมใหม่ต่อท้าย
      setGameList((prevGames) => [...prevGames, newGame]);
    } else {
      // ถ้ากำลังแก้ไข ใช้ map() สร้าง Array ใหม่และเปลี่ยนเฉพาะเกม id ที่ตรงกัน
      setGameList((prevGames) =>
        prevGames.map((game) =>
          game.id === editingId
            ? {
                // คัดลอกข้อมูลเดิมก่อน เพื่อรักษา id เดิมของเกมไว้
                ...game,
                title: draft.title.trim(),
                platform: draft.platform,
                hours: Number(draft.hours),
                status: draft.status,
              }
            // เกมอื่นที่ไม่ได้แก้ไขให้คืนค่าเดิม
            : game
        )
      );

      // ออกจากโหมดแก้ไขหลังบันทึกสำเร็จ
      setEditingId(null);
    }

    // ซ่อนฟอร์มหลังเพิ่มหรือแก้ไขสำเร็จ
    setIsFormOpen(false);
  }

  // เริ่มแก้ไขเกมที่ผู้ใช้เลือก
  function handleEdit(id: string) {
    // จำ id เพื่อให้หาเกมเดิมกลับเข้าฟอร์มได้
    setEditingId(id);
    // เปิดฟอร์มทันทีเมื่อผู้ใช้กดแก้ไข
    setIsFormOpen(true);
  }

  // ลบเกมตาม id ที่รับมาจาก GameCard
  function handleDelete(id: string) {
    // filter() คืน Array ใหม่ที่ไม่มีเกม id ที่ผู้ใช้กดลบ
    setGameList((prevGames) =>
      prevGames.filter((game) => game.id !== id)
    );

    // ถ้าลบเกมที่กำลังแก้ไขอยู่ ให้ปิดโหมดแก้ไขและซ่อนฟอร์ม
    if (editingId === id) {
      setEditingId(null);
      setIsFormOpen(false);
    }
  }

  // เปิดหรือปิดฟอร์มเพิ่มเกม
  function handleToggleForm() {
    // เมื่อกดเพิ่มเกม ให้ล้าง id ที่อาจเคยใช้แก้ไขเกมเก่า
    setEditingId(null);
    // สลับ true เป็น false หรือ false เป็น true
    setIsFormOpen((isOpen) => !isOpen);
  }

  // ยกเลิกการแก้ไขและซ่อนฟอร์ม
  function handleCancelForm() {
    setEditingId(null);
    setIsFormOpen(false);
  }

  // return ส่ง JSX ทั้งหมดของส่วนจัดการเกมไปแสดงบนหน้า /games
  return (
    // div ครอบแถบจัดการ ฟอร์ม และรายการการ์ดทั้งหมด
    <div className="gameExplorer">
      {/* แถบเล็กสำหรับเปิดและปิดฟอร์ม เพื่อไม่ให้หน้าดูเกะกะ */}
      <section className="gameManagerBar" aria-label="จัดการรายการเกม">
        <div>
          <strong>จัดการ Game Backlog</strong>
          <span>เพิ่มหรือแก้ไขรายการเกมได้ที่นี่</span>
        </div>
        <button
          className="gameFormToggle"
          type="button"
          aria-expanded={isFormOpen}
          onClick={handleToggleForm}
        >
          {isFormOpen ? "ปิดฟอร์ม" : "+ เพิ่มเกม"}
        </button>
      </section>

      {/* แสดงฟอร์มเฉพาะตอนที่ isFormOpen เป็น true */}
      {isFormOpen ? (
        <GameForm
          // key ช่วยให้ React สร้างฟอร์มใหม่เมื่อเปลี่ยนเกมที่กำลังแก้ไข
          key={editingGame?.id ?? "new-game"}
          // ส่งข้อมูลเกมเดิมให้ฟอร์ม ถ้าเพิ่มเกมจะเป็น undefined
          initialGame={editingGame}
          // ส่งฟังก์ชันบันทึกให้ฟอร์มเรียกกลับ
          onSave={handleSave}
          // ส่งฟังก์ชันยกเลิกให้ฟอร์มเรียกกลับ
          onCancel={handleCancelForm}
        />
      ) : null}

      {/* section ครอบ GameCard ที่ map() สร้างจากรายการเกม */}
      <section className="gameGrid" aria-label="รายการเกมที่ตั้งใจจะเล่น">
        {/* map() วนเกมทีละรายการและสร้าง GameCard หนึ่งใบต่อหนึ่งเกม */}
        {gameList.map((game) => (
          <GameCard
            // key ใช้ id ที่ไม่ซ้ำกันเพื่อให้ React แยกการ์ดแต่ละใบ
            key={game.id}
            // ส่ง Object เกมปัจจุบันไปให้ GameCard
            game={game}
            // ส่งฟังก์ชันแก้ไขให้ GameCard เรียกเมื่อกดปุ่ม
            onEdit={handleEdit}
            // ส่งฟังก์ชันลบให้ GameCard เรียกเมื่อกดปุ่ม
            onDelete={handleDelete}
          />
        ))}
      </section>
    </div>
  );
}
