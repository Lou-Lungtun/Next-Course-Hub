"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Course } from "../../types/course";

export type CourseDraft = {
    code: string;
    name: string;
    credit: string;
    instructor: string;
};

const emptyDraft: CourseDraft = {
    code: "",
    name: "",
    credit: "",
    instructor: "",
};

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

    function validate(value: CourseDraft): FormErrors {
        const nextErrors: FormErrors = {};

        if (value.code.trim() === "") {
            nextErrors.code = "กรุณาระบุรหัสวิชา";
        }

        // เติม: เมธอดที่ตัดช่องว่างหัวท้ายของข้อความออก
        if (value.name.trim() === "") {
            nextErrors.name = "กรุณาระบุชื่อวิชา";
        }

        const credit = Number(value.credit);
        if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
            nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
        }

        if (value.instructor.trim() === "") {
            nextErrors.instructor = "กรุณาระบุชื่อผู้สอน";
        }

        return nextErrors;
    }

type CourseFormProps = {
    initialCourse?: Course;
    onSave?: (draft: CourseDraft) => void;
    onCancel?: () => void;
};

    function toDraft(course?: Course): CourseDraft {
        if (!course) {
            return emptyDraft;
        }

        return {
            code: course.code,
            name: course.name,
            credit: String(course.credit),
            instructor: course.instructor,
        };
    }

export default function CourseForm(
    { initialCourse, onSave, onCancel }: CourseFormProps = {}
) {
        const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
        const [errors, setErrors] = useState<FormErrors>({});

        function handleChange(event: ChangeEvent<HTMLInputElement>) {
            const { name, value } = event.target;
            setDraft((prev) => ({ ...prev, [name]: value }));
        }

        function handleSubmit(event: FormEvent<HTMLFormElement>) {
            event.preventDefault();

            const nextErrors = validate(draft);
            setErrors(nextErrors);

            if (Object.keys(nextErrors).length > 0) {
                return;
            }

            if (onSave) {
                onSave(draft);
            } else {
                console.log("ข้อมูลรายวิชา:", draft);
            }

            setDraft(emptyDraft);
            setErrors({});
        }


        return (
            <form className="courseForm" onSubmit={handleSubmit} noValidate>
                <header className="courseFormHeader">
                    <p className="courseFormEyebrow">COURSE MANAGER</p>
                    <h2>{initialCourse ? "แก้ไขรายวิชา" : "เพิ่มรายวิชาใหม่"}</h2>
                    <p>
                        {initialCourse
                            ? "แก้ไขข้อมูลที่ต้องการ แล้วกดบันทึกการแก้ไข"
                            : "กรอกข้อมูลให้ครบเพื่อเพิ่มรายวิชาเข้าสู่รายการ"}
                    </p>
                </header>

                <div className="courseFormFields">
                    <div className="courseFormField">
                        <label htmlFor="code">รหัสวิชา</label>
                        <input
                            id="code"
                            name="code"
                            type="text"
                            value={draft.code}
                            onChange={handleChange}
                            aria-invalid={!!errors.code}
                            aria-describedby={errors.code ? "code-error" : undefined}
                        />
                        {errors.code ? <p className="formError" id="code-error">{errors.code}</p> : null}
                    </div>

                    <div className="courseFormField">
                        <label htmlFor="name">ชื่อวิชา</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={draft.name}
                            onChange={handleChange}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name ? <p className="formError" id="name-error">{errors.name}</p> : null}
                    </div>

                    <div className="courseFormField">
                        <label htmlFor="credit">หน่วยกิต</label>
                        <input
                            id="credit"
                            name="credit"
                            type="number"
                            inputMode="numeric"
                            min="1"
                            max="6"
                            value={draft.credit}
                            onChange={handleChange}
                            aria-invalid={!!errors.credit}
                            aria-describedby={errors.credit ? "credit-error" : undefined}
                        />
                        {errors.credit ? <p className="formError" id="credit-error">{errors.credit}</p> : null}
                    </div>

                    <div className="courseFormField">
                        <label htmlFor="instructor">ผู้สอน</label>
                        <input
                            id="instructor"
                            name="instructor"
                            type="text"
                            value={draft.instructor}
                            onChange={handleChange}
                            aria-invalid={!!errors.instructor}
                            aria-describedby={errors.instructor ? "instructor-error" : undefined}
                        />
                        {errors.instructor ? (
                            <p className="formError" id="instructor-error">{errors.instructor}</p>
                        ) : null}
                    </div>
                </div>

                <div className="courseFormActions">
                    <button className="courseSubmitButton" type="submit">
                        {initialCourse ? "บันทึกการแก้ไข" : "เพิ่มรายวิชา"}
                    </button>
                    {initialCourse && onCancel ? (
                        <button className="courseCancelButton" type="button" onClick={onCancel}>
                            ยกเลิก
                        </button>
                    ) : null}
                </div>
            </form>
        );
    }
