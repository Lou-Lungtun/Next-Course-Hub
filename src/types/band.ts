// สร้างและ export Type Member เพื่อกำหนดรูปแบบสมาชิกหนึ่งคน
// Type นี้ถูกนำไปใช้ต่อใน property members ของ Band ด้านล่าง
export type Member = {
  // id ต้องเป็นตัวเลข และถูกส่งไปใช้เป็น key ใน members.map()
  id: number;
  // name ต้องเป็นข้อความ และถูกนำไปแสดงใน <span> ของ BandCard
  name: string;
  // role ต้องเป็นข้อความ และถูกนำไปแสดงใน <small> ของ BandCard
  role: string;
  // image เก็บ path รูปสมาชิก เครื่องหมาย ? หมายถึงไม่ใส่รูปก็ได้
  image?: string;
};

// สร้างและ export Type Band เพื่อให้ bandsdata และ BandCard ใช้ร่วมกัน
export type Band = {
  // id ของวงต้องเป็นตัวเลข และถูกใช้เป็น key ใน bands.map()
  id: number;
  // name ถูกส่งผ่าน Props ไปแสดงเป็นหัวข้อ <h2> ใน BandCard
  name: string;
  // genre ถูกส่งผ่าน Props ไปแสดงเป็นป้ายแนวเพลง
  genre: string;
  // image เก็บ path รูป เครื่องหมาย ? หมายถึงไม่ใส่รูปก็ได้
  image?: string;
  // members เป็น Array ของ Member และถูก BandCard นำไปวนด้วย map()
  members: Member[];
};
