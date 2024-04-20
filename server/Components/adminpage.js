function renderForm(formType) {
    // Logic to render the form based on formType
    switch (formType) {
        case 'A':
            // Render Student Enrollment form
            renderStudentEnrollmentForm();
            break;
        case 'B':
            // Render Student Removal form
            renderStudentRemovalForm();
            break;
        case 'E':
            // Render Course Enrollment form
            renderCourseEnrollmentForm();
            break;
        case 'F':
            // Render Course Removal form
            renderCourseRemovalForm();
            break;
        case 'Exam':
            // Render Course Removal form
            renderExaminationForm();
            break;
        // Add cases for other form types (C, D, E, F, Exam) if needed
        default:
            // Handle default case or invalid formType
            console.error('Invalid form type');
    }
}













//function renderStudentRemovalForm() {
    // Logic to render Student Removal form
//}

// Implement functions to render other forms as needed
