"use client";

import { useState, type ChangeEvent } from "react";
import type { Course } from "../../types/course";
import CourseCard from "./CourseCard";
import CourseForm, { type CourseDraft } from "./CourseForm";

type CourseExplorerProps = {
  courses: Course[];
};

type CourseFilter = "all" | "open" | "closed" | "favorites";

export default function CourseExplorer({ courses: initialCourses }: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [activeFilter, setActiveFilter] = useState<CourseFilter>("all");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handleToggleFavorite(id: string) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((favoriteId) => favoriteId !== id)
        : [...prevIds, id]
    );
  }

  function handleClearFilters() {
    setKeyword("");
    setActiveFilter("all");
  }

  function handleCreate(draft: CourseDraft) {
    // เติม: เมธอดที่สร้างรหัสสุ่มไม่ซ้ำกันในรูปแบบ UUID
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
      isOpen: false
    };

    setCourses([...courses, newCourse]);
  }

  function handleDelete(id: string) {
    // เติม: เมธอดของ Array ที่คืนเฉพาะสมาชิกที่ผ่านเงื่อนไข
    setCourses(courses.filter((course) => course.id !== id));
    setFavoriteIds((prevIds) => prevIds.filter((favoriteId) => favoriteId !== id));
    if (editingId === id) {
      setEditingId(null);
      setIsFormOpen(false);
    }
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
            ...course,
            code: draft.code.trim(),
            name: draft.name.trim(),
            credit: Number(draft.credit),
            instructor: draft.instructor.trim(),
          }
          : course
      )
    );

    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
    } else {
      handleUpdate(editingId, draft);
    }

    setIsFormOpen(false);
  }

  function handleStartEdit(id: string) {
    setEditingId(id);
    setIsFormOpen(true);
  }

  function handleToggleForm() {
    setEditingId(null);
    setIsFormOpen((isOpen) => !isOpen);
  }

  function handleCancelForm() {
    setEditingId(null);
    setIsFormOpen(false);
  }

  const editingCourse = courses.find((course) => course.id === editingId);


  const searchText = keyword.trim().toLowerCase();

  const visibleCourses = courses.filter((course) => {
    const matchesKeyword =
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText);

    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "open" && course.isOpen) ||
      (activeFilter === "closed" && !course.isOpen) ||
      (activeFilter === "favorites" && favoriteIds.includes(course.id));

    return matchesKeyword && matchesFilter;
  });

  const filters: { value: CourseFilter; label: string }[] = [
    { value: "all", label: "ทั้งหมด" },
    { value: "open", label: "เปิดลงทะเบียน" },
    { value: "closed", label: "ปิดลงทะเบียน" },
    { value: "favorites", label: `รายการโปรด (${favoriteIds.length})` },
  ];


  return (
    <div className="courseExplorer">
      <section className="courseManagerBar" aria-label="จัดการรายวิชา">
        <div>
          <strong>จัดการรายวิชา</strong>
          <span>เพิ่มหรือแก้ไขข้อมูลเมื่อต้องการ</span>
        </div>
        <button
          className="courseFormToggle"
          type="button"
          aria-expanded={isFormOpen}
          onClick={handleToggleForm}
        >
          {isFormOpen ? "ปิดฟอร์ม" : "+ เพิ่มรายวิชา"}
        </button>
      </section>

      {isFormOpen ? (
        <CourseForm
          key={editingId ?? "new-course"}
          initialCourse={editingCourse}
          onSave={handleSave}
          onCancel={handleCancelForm}
        />
      ) : null}

      <section className="courseToolbar" aria-label="เครื่องมือค้นหารายวิชา">
        <label className="courseSearch">
          <span className="searchIcon" aria-hidden="true">⌕</span>
          <span className="srOnly">ค้นหารายวิชา</span>
          <input
            type="search"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
          />
          {keyword && (
            <button
              className="clearSearchButton"
              type="button"
              onClick={() => setKeyword("")}
              aria-label="ล้างคำค้นหา"
            >
              ×
            </button>
          )}
        </label>

        <div className="courseFilters" aria-label="กรองสถานะรายวิชา">
          {filters.map((filter) => (
            <button
              key={filter.value}
              className="filterButton"
              type="button"
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <div className="courseResultsSummary" aria-live="polite">
        <p>พบ <strong>{visibleCourses.length}</strong> จาก {courses.length} รายวิชา</p>
        <p>บันทึกรายการโปรดแล้ว <strong>{favoriteIds.length}</strong> วิชา</p>
      </div>

      {visibleCourses.length === 0 ? (
        <section className="courseEmptyState">
          <span aria-hidden="true">⌕</span>
          <h2>ไม่พบรายวิชา</h2>
          <p>ลองเปลี่ยนคำค้นหาหรือตัวกรอง แล้วค้นหาอีกครั้ง</p>
          <button className="button emptyStateButton" type="button" onClick={handleClearFilters}>
            ล้างการค้นหาและตัวกรอง
          </button>
        </section>
      ) : (
        <section className="courseGrid" aria-label="ผลการค้นหารายวิชา">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favoriteIds.includes(course.id)}
              onToggleFavorite={handleToggleFavorite}
              onEdit={handleStartEdit}
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}
    </div>
  );
}
