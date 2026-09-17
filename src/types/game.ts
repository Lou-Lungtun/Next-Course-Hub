// Status กำหนดค่าที่อนุญาตให้ใช้เป็นสถานะของเกม
export type GameStatus = "ยังไม่เริ่ม" | "กำลังเล่น" | "เล่นจบแล้ว";

// Type Game กำหนดรูปแบบข้อมูลของเกมหนึ่งรายการ
export type Game = {
  // id ใช้ระบุเกมแต่ละเกมให้ไม่ซ้ำกัน
  id: string;
  // ชื่อเกม
  title: string;
  // เครื่องหรือระบบที่ใช้เล่นเกม
  platform: string;
  // จำนวนชั่วโมงที่คาดว่าจะใช้เล่น
  hours: number;
  // สถานะของเกม
  status: GameStatus;
};
