"use client";

// useState เก็บข้อมูลที่เปลี่ยนตามการพิมพ์ และ Type สองตัวช่วยตรวจชนิด Event
import { useState, type ChangeEvent, type FormEvent } from "react";
// Game ใช้รับข้อมูลเดิมตอนแก้ไข และ GameStatus ใช้จำกัดค่าสถานะ
import type { Game, GameStatus } from "@/types/game";

// GameDraft คือข้อมูลที่ผู้ใช้กำลังกรอกอยู่ในฟอร์ม
export type GameDraft = {
  // ชื่อเกมที่ผู้ใช้กรอก
  title: string;
  // แพลตฟอร์มที่ผู้ใช้เลือก
  platform: string;
  // เก็บเป็น string เพราะค่าจาก input อ่านออกมาเป็นข้อความ
  hours: string;
  // สถานะต้องเป็นหนึ่งในค่าที่ Type GameStatus อนุญาต
  status: GameStatus;
};

// ค่าเริ่มต้นของฟอร์มตอนเพิ่มเกมใหม่
const emptyDraft: GameDraft = {
  title: "",
  platform: "",
  hours: "",
  status: "ยังไม่เริ่ม",
};

// เก็บข้อความ Error ของแต่ละช่อง โดยช่องที่ไม่ผิดจะไม่มีข้อความ
type GameErrors = Partial<Record<keyof GameDraft, string>>;

type GameFormProps = {
  // เกมเดิมที่ส่งมาเมื่อผู้ใช้กดแก้ไข ถ้าเพิ่มใหม่จะไม่มีค่า
  initialGame?: Game;
  // ฟังก์ชันส่ง draft ที่ผ่าน Validation กลับไป Component แม่
  onSave: (draft: GameDraft) => void;
  // ฟังก์ชันยกเลิกการแก้ไข
  onCancel: () => void;
};

//เช็กเงื่อนไขก่อนแสดงฟอร์ม: ถ้าไม่มีข้อมูลเกมเดิมส่งมา (!game) ให้คืนค่าเป็นฟอร์มเปล่า (emptyDraft) ทันที
// แปลงข้อมูล Game ให้มีรูปแบบเดียวกับข้อมูลในฟอร์ม
function toDraft(game?: Game): GameDraft {
  if (!game) {
    return emptyDraft;
  }

  return {
    title: game.title,
    platform: game.platform,
    hours: String(game.hours),
    status: game.status,
  };
}

//nextErrors: กล่องเก็บรายการเออเรอร์ที่เจอ
// ตรวจข้อมูลก่อนส่งกลับไปให้ GameExplorer
function validate(draft: GameDraft): GameErrors {
  const nextErrors: GameErrors = {};

  //.trim() === "": ตัดช่องว่างหัวท้าย ถ้าไม่พิมพ์อะไรเลย จะแจ้งเตือนว่า "กรุณากรอกชื่อเกม"
  if (draft.title.trim() === "") {
    nextErrors.title = "กรุณากรอกชื่อเกม";
  }

  //platform === "": ถ้ายังอยู่ที่ตัวเลือกแรก (ยังไม่เลือกเครื่องเกม) จะแจ้งเตือนว่า "กรุณาเลือกแพลตฟอร์ม"
  if (draft.platform === "") {
    nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
  }

  //Number(draft.hours): แปลงข้อความชั่วโมงเป็นตัวเลข หากไม่ใช่จำนวนเต็ม
  // (!Number.isInteger) หรือน้อยกว่าหรือเท่ากับ 0 จะแจ้งเตือนว่า "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก"
  const hours = Number(draft.hours);
  if (!Number.isInteger(hours) || hours <= 0) {
    nextErrors.hours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
  }

  return nextErrors;
}

export default function GameForm({
  // รับข้อมูลเกมเดิมผ่าน Props
  initialGame,
  // รับฟังก์ชันบันทึกผ่าน Props
  onSave,
  // รับฟังก์ชันยกเลิกผ่าน Props
  onCancel,
}: GameFormProps) {
  // เก็บค่าจากทุกช่องไว้ใน State ก้อนเดียว
  // const [draft, setDraft]: ตัวเก็บข้อมูลทั้งหมดของ 4 ช่องกรอกในหน้าเว็บ
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));
  //const [errors, setErrors]: ตัวเก็บข้อความแจ้งเตือนสีแดงของแต่ละช่อง
  const [errors, setErrors] = useState<GameErrors>({});

  // ฟังก์ชันเดียวรับค่าจาก input และ select ทุกช่อง
  // handleChange: ฟังก์ชันดักจับทุกการกดแป้นพิมพ์ โดยดูจาก name ของช่องนั้นๆ แล้วนำค่าใหม่ไปทับค่าเดิมใน draft
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const fieldName = event.target.name as keyof GameDraft;
    const value = event.target.value;

    setDraft((prevDraft) => ({
      ...prevDraft,
      [fieldName]: value,
    }));
  }

  //handleSubmit: ทำงานเมื่อกดปุ่มบันทึก
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // ป้องกันไม่ให้ form โหลดหน้าเว็บใหม่
    event.preventDefault();

    // เรียก validate เพื่อตรวจทุกช่องใน draft
    const nextErrors = validate(draft);
    // เก็บ Error เพื่อให้ JSX แสดงข้อความใต้ช่องที่ผิด
    setErrors(nextErrors);

    // ถ้ามี Error อย่างน้อย 1 ช่อง ให้หยุดก่อนบันทึก
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // ส่งข้อมูลที่กรอกถูกต้องกลับไปให้ Component แม่
    onSave(draft);
  }

  return (
    // form ครอบช่องกรอกทั้งหมดและเรียก handleSubmit เมื่อกดปุ่ม submit
    <form className="gameForm" onSubmit={handleSubmit} noValidate>
      {/* เปลี่ยนหัวข้อระหว่างโหมดเพิ่มเกมและแก้ไขเกม */}
      <h2>{initialGame ? "แก้ไขเกม" : "เพิ่มเกมใน Backlog"}</h2>

      {/* div จัดช่องกรอกให้เป็นแถวกะทัดรัดเหมือนฟอร์มรายวิชา */}
      <div className="gameFormFields">
        <div className="gameFormField">
          <label htmlFor="title">ชื่อเกม</label>
          <input
            id="title"
            name="title"
            type="text"
            value={draft.title}
            onChange={handleChange}
          />
          {/* กล่อง {errors.ช่อง && <p className="formError">...}: ถ้าช่องไหนตรวจแล้วพบเออเรอร์ ข้อความเตือนสีแดงจะโผล่ขึ้นมาใต้ช่องนั้นทันที */}
          {errors.title && <p className="formError">{errors.title}</p>}
        </div>

        <div className="gameFormField">
          <label htmlFor="platform">แพลตฟอร์ม</label>
          <select
            id="platform"
            name="platform"
            value={draft.platform}
            onChange={handleChange}
          >
            <option value="">-- เลือกแพลตฟอร์ม --</option>
            <option value="PC">PC</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Xbox Series X|S">Xbox Series X|S</option>
          </select>
          {errors.platform && <p className="formError">{errors.platform}</p>}
        </div>

        <div className="gameFormField">
          <label htmlFor="hours">ชั่วโมงที่คาดว่าจะเล่น</label>
          <input
            id="hours"
            name="hours"
            type="number"
            min="1"
            value={draft.hours}
            onChange={handleChange}
          />
          {errors.hours && <p className="formError">{errors.hours}</p>}
        </div>

        <div className="gameFormField">
          <label htmlFor="status">สถานะ</label>
          <select
            id="status"
            name="status"
            value={draft.status}
            onChange={handleChange}
          >
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>
        </div>
      </div>

      {/* div ครอบปุ่มบันทึกและปุ่มยกเลิก */}
      <div className="gameFormActions">
        {/* ปุ่ม submit ทำให้ form เรียก handleSubmit */}
        <button className="gameSaveButton" type="submit">
          {initialGame ? "บันทึกการแก้ไข" : "เพิ่มเกม"}
        </button>

        {/* {initialGame && (...) : เงื่อนไขแสดงปุ่ม "ยกเลิก" เฉพาะตอนกำลังแก้ไขข้อมูลเกมเดิมเท่านั้น (ถ้าเพิ่มเกมใหม่ปุ่มนี้จะไม่โผล่มา) */}
        {/* แสดงปุ่มยกเลิกเฉพาะตอนกำลังแก้ไขเกมเดิม */}
        {initialGame && (
          <button className="gameCancelButton" type="button" onClick={onCancel}>
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}
