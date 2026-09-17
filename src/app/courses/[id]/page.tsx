import { notFound } from "next/navigation";
import { courses } from "../data/coursesdata";
import type { Metadata } from "next";
import Link from "next/link";

type CoursePageProps = {
  params: Promise<{ id: string }>;
};


export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const course = courses.find((item) => item.id === id);

  // เติม: ฟังก์ชันที่สั่งให้แสดงหน้า 404
  if (!course) {
    notFound();
  }

  return (
    <main className="page courseDetailPage">
      <Link className="courseBackLink" href="/courses">
        ← กลับไปหน้ารายวิชา
      </Link>

      <article className="courseDetailCard">
        <p className="eyebrow">COURSE DETAIL</p>
        <p className="courseDetailCode">{course.code}</p>
        <h1>{course.name}</h1>

        <div className="courseDetailGrid">
          <section>
            <span>หน่วยกิต</span>
            <strong>{course.credit}</strong>
          </section>
          <section>
            <span>ผู้สอน</span>
            <strong>{course.instructor}</strong>
          </section>
          <section>
            <span>สถานะ</span>
            <strong className={course.isOpen ? "detailStatusOpen" : "detailStatusClosed"}>
              {course.isOpen ? "เปิดลงทะเบียน" : "ปิดลงทะเบียน"}
            </strong>
          </section>
        </div>
      </article>
    </main>
  );
}

export async function generateMetadata(
  { params }: CoursePageProps
): Promise<Metadata> {
  // เติม: คำสั่งที่ใช้รอค่าจาก Promise
  const { id } = await params;
  const course = courses.find((item) => item.id === id);

  return {
    title: course ? course.name : "ไม่พบรายวิชา",
  };
}

