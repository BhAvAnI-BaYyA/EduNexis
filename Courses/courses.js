document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        { id: 1, name: 'Python Programming', description: 'Learn Python programming language from scratch to advanced level.', price: 100, subCourses: [
            { name: 'Introduction to Python', price: 20 },
            { name: 'Advanced Python', price: 30 },
            { name: 'Python for Data Science', price: 25 }
        ] },
        { id: 2, name: 'ML with Python', description: 'Dive into machine learning concepts using Python and popular libraries.', price: 120, subCourses: [
            { name: 'Introduction to Machine Learning', price: 25 },
            { name: 'Deep Learning with Python', price: 35 },
            { name: 'Machine Learning Projects', price: 30 }
        ] },
        { id: 3, name: 'Full-Stack Web Development', description: 'Master front-end and back-end web development with modern technologies.', price: 150, subCourses: [
            { name: 'HTML', price: 20 },
            { name: 'CSS', price: 20 },
            { name: 'JavaScript', price: 30 },
            { name: 'React', price: 30 },
            { name: 'Node.js', price: 50 }
        ] },
        { id: 4, name: 'Data Science and Analytics', description: 'Explore data science techniques, analytics, and visualization tools.', price: 130, subCourses: [
            { name: 'Data Analysis with Python', price: 30 },
            { name: 'Data Visualization', price: 30 },
            { name: 'Statistical Analysis', price: 40 }
        ] },
        { id: 5, name: 'Cybersecurity Fundamentals', description: 'Understand the fundamentals of cybersecurity and best practices.', price: 110, subCourses: [
            { name: 'Network Security', price: 30 },
            { name: 'Ethical Hacking', price: 35 },
            { name: 'Cybersecurity Tools', price: 25 }
        ] },
        { id: 6, name: 'Cloud Computing with AWS', description: 'Learn cloud computing principles and services using Amazon Web Services.', price: 140, subCourses: [
            { name: 'AWS Basics', price: 20 },
            { name: 'AWS Advanced', price: 40 },
            { name: 'AWS Security', price: 30 }
        ] },
        { id: 7, name: 'Mobile App Development', description: 'Build mobile applications for iOS and Android platforms.', price: 130, subCourses: [
            { name: 'iOS Development', price: 50 },
            { name: 'Android Development', price: 50 },
            { name: 'Cross-Platform Development', price: 30 }
        ] },
        { id: 8, name: 'DevOps and CI/CD', description: 'Implement DevOps practices and continuous integration/continuous deployment pipelines.', price: 120, subCourses: [
            { name: 'DevOps Basics', price: 20 },
            { name: 'CI/CD with Jenkins', price: 30 },
            { name: 'Kubernetes', price: 40 }
        ] },
        { id: 9, name: 'Blockchain Technology', description: 'Explore blockchain fundamentals, smart contracts, and cryptocurrency.', price: 160, subCourses: [
            { name: 'Blockchain Basics', price: 30 },
            { name: 'Smart Contracts', price: 40 },
            { name: 'Cryptocurrency', price: 50 }
        ] },
        { id: 10, name: 'AI Fundamentals', description: 'Get introduced to artificial intelligence concepts and applications.', price: 140, subCourses: [
            { name: 'AI Basics', price: 30 },
            { name: 'Machine Learning for AI', price: 40 },
            { name: 'AI Projects', price: 50 }
        ] },
        { id: 11, name: 'UI/UX Design', description: 'Learn user interface and user experience design principles and tools.', price: 100, subCourses: [
            { name: 'UI Design', price: 20 },
            { name: 'UX Design', price: 30 },
            { name: 'Prototyping', price: 25 }
        ] },
        { id: 12, name: 'Big Data Analytics', description: 'Analyze and process large volumes of data using big data technologies.', price: 150, subCourses: [
            { name: 'Big Data Basics', price: 30 },
            { name: 'Hadoop', price: 40 },
            { name: 'Spark', price: 50 }
        ] }
    ];

    const courseGrid = document.getElementById('course-grid');
    let selectedCourses = JSON.parse(localStorage.getItem('selectedCourses')) || [];
    let selectedSubCourses = [];

    courses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h2>${course.name}</h2>
            <p>${course.description}</p>
            <p>Price: $${course.price}</p>
        `;
        card.addEventListener('click', () => showSubCoursesPopup(course));
        courseGrid.appendChild(card);
    });

    function showSubCoursesPopup(course) {
        const subCoursesPopup = document.getElementById('sub-courses-popup');
        subCoursesPopup.style.display = 'flex';
        const subCoursesList = document.getElementById('sub-courses-list');
        subCoursesList.innerHTML = '';

        course.subCourses.forEach(subCourse => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" class="sub-course-checkbox" data-price="${subCourse.price}"> ${subCourse.name} - $${subCourse.price}
            `;
            subCoursesList.appendChild(listItem);
        });

        document.getElementById('popup-total-price').innerText = `Total Price: $${course.price}`;

        document.querySelectorAll('.sub-course-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => updatePopupTotal(course.price));
        });

        document.getElementById('popup-english-course').checked = false;
        document.getElementById('popup-english-course').addEventListener('change', () => updatePopupTotal(course.price));

        document.getElementById('buy-button').addEventListener('click', showConfirmation);
    }

    function updatePopupTotal(basePrice) {
        const checkboxes = document.querySelectorAll('.sub-course-checkbox:checked');
        let totalPrice = Array.from(checkboxes).reduce((sum, checkbox) => sum + parseFloat(checkbox.getAttribute('data-price')), basePrice);

        if (document.getElementById('popup-english-course').checked) {
            totalPrice += 50;
        }

        document.getElementById('popup-total-price').innerText = `Total Price: $${totalPrice}`;
    }

    function showConfirmation() {
        const subCoursesPopup = document.getElementById('sub-courses-popup');
        subCoursesPopup.style.display = 'none';

        const checkboxes = document.querySelectorAll('.sub-course-checkbox:checked');
        const selectedSubCourseNames = Array.from(checkboxes).map(cb => cb.parentElement.innerText.split('-')[0].trim());
        const baseCourseName = document.querySelector('.card h2').innerText;
        const totalPrice = document.getElementById('popup-total-price').innerText;

        document.getElementById('selected-courses').innerText = `Selected Courses: ${baseCourseName}, ${selectedSubCourseNames.join(', ')}`;
        document.getElementById('final-price').innerText = totalPrice;

        const confirmationPopup = document.getElementById('confirmation-popup');
        confirmationPopup.style.display = 'flex';
    }

    document.getElementById('close-popup').addEventListener('click', () => {
        document.getElementById('sub-courses-popup').style.display = 'none';
    });

    document.getElementById('close-confirmation-popup').addEventListener('click', () => {
        document.getElementById('confirmation-popup').style.display = 'none';
    });
});
