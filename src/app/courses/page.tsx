type Course = { id: number; code: string; title: string; credits: number; isOpen: boolean };

const courses: Course[] = [
  { id: 1, code: "10301231", title: "Web Technology", credits: 3, isOpen: true },
  { id: 2, code: "10301232", title: "Database Systems", credits: 3, isOpen: false },
  { id: 3, code: "10301233", title: "Computer Programming", credits: 3, isOpen: true },
  { id: 4, code: "10301234", title: "User Interface Design", credits: 3, isOpen: true },
  { id: 5, code: "10301235", title: "Software Engineering", credits: 3, isOpen: false },
];

export default function CoursesPage() {
  return (
    <main className="page">
      <p className="eyebrow">COURSE CATALOG</p>
      <h1>รายวิชาทั้งหมด</h1>
      <p className="pageDescription">ตัวอย่างข้อมูลรายวิชาที่จัดเก็บด้วย TypeScript Array of Object</p>
      <section className="courseGrid" aria-label="รายการรายวิชา">
        {courses.map((course) => (
          <article key={course.id} className="courseCard">
            <p className="courseCode">{course.code}</p><h2>{course.title}</h2>
            <p>{course.credits} หน่วยกิต</p>
            <p className={course.isOpen ? "statusOpen" : "statusClosed"}>{course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
