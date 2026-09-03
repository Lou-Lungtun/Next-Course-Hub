import CourseCard from "@/components/CourseCard";
import { courses } from "./data/coursesdata";

export default function CoursesPage() {
  return (
    <main>
      <h1>รายวิชาทั้งหมด</h1>

      <section className="courseGrid" aria-label="รายการรายวิชา">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            code={course.code}
            title={course.title}
            credits={course.credits}
            isOpen={course.isOpen}
          />
        ))}
      </section>
    </main>
  );
}
