document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log("Employee registration started: ", data);

    const apiUrl = 'http://localhost:5500/api/employees/register';
    try {
        const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  // Ensure that data is in JSON format
        },
        body: JSON.stringify(data),  // Convert data to JSON before sending
        });

        // Parse response
        const result = await response.json();

        if (response.ok) {
            // Successful registration
            console.log('Employee registered:', result);
            alert('Employee registered successfully!');
            document.getElementById('registerForm').reset();
        } else {
            // Handle errors
            console.error('Error:', result.error);
            alert('Error registering employee: ' + result.error);
        }
    } catch (err) {
        // Handle network errors or other issues
        console.error('Network Error:', err);
        alert('Error registering employee. Please try again later.');
    }
});
  
function searchEmployee() {
    // Get the values from the input fields
    let employee_Id = parseInt(document.getElementById('emp-id').value, 10); // Keeping it as string initially
    const name = document.getElementById('emp-name').innerText;
    const [first_name, last_name] = name.split(' ');

    // Convert employee_Id to number, but keep it empty if invalid)
    if (isNaN(employee_Id)) {
        employee_Id = ""; // Reset if it's not a valid number
    }

    // Validate if either Employee ID is entered or both First and Last Name are entered
    if ((employee_Id === "" && (first_name === "" || last_name === "")) || 
        (employee_Id !== "" && (first_name !== "" || last_name !== ""))) {
        alert("Please enter either Employee ID or both First and Last Name.");
    return;
}

    let url = "http://localhost:5500/api/employees/search?";

    if (employee_Id !== "") {
        url += `employee_id=${employee_Id}`; // Append employee_id
    } else if (first_name !== "" && last_name !== "") {
        url += `first_name=${first_name}&last_name=${last_name}`; // Append first and last name
    }

    // Make a GET request to the specified URL
    fetch(url, {
        method: "GET"
    })
    .then(response => response.json())
    .then(response => {
        if (response.error) {
            alert(response.error);  // Show error if provided by the backend
        } else {
            showEmployee(response); // Pass response directly to show employee details
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    });
}

// Function to show the modal with employee details
function showEmployee(employee) {
    showModal();
    displayEmployeeData(employee);
}

function showModal() {
    document.getElementById('employeeModal').style.display = 'block';
    document.getElementById('employee_id').value = '';
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
}

function displayEmployeeData(employee) {
    document.getElementById('emp-id').textContent = employee.employee_id;
    document.getElementById('emp-name').textContent = employee[0].first_name + " " + employee[0].last_name;
    document.getElementById('emp-phone').textContent = employee[0].phone;
    document.getElementById('emp-dob').textContent = employee[0].dob;
    document.getElementById('emp-gender').textContent = employee[0].gender;
    document.getElementById('emp-dept').textContent = employee[0].department;
    document.getElementById('emp-salary').textContent = employee[0].salary;
    document.getElementById('emp-address').textContent = employee[0].address;
}

function closeModal() {
    document.getElementById('employeeModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('employeeModal');
    if (event.target === modal) {
        closeModal();
    }
}

function enableEdit() {
    document.querySelectorAll('.editable').forEach(span => {
        span.setAttribute('contenteditable', 'true');
        span.style.border = '1px solid black';
    });
    //document.getElementById('edit-button').style.display = 'none';
    document.getElementById('save-button').style.display = 'inline-block';
}

async function saveChanges() {
    const name = document.getElementById('emp-name').innerText;
    const [first_name, last_name] = name.split(' ');  // Splitting the name into first and last name

    const updatedData = {
        employee_id: document.getElementById('emp-id').innerText,
        first_name: first_name,  // First name
        last_name: last_name,    // Last name
        phone: document.getElementById('emp-phone').innerText,
        dob: document.getElementById('emp-dob').innerText,
        address: document.getElementById('emp-address').innerText,
        gender: document.getElementById('emp-gender').innerText,
        department: document.getElementById('emp-dept').innerText,
        salary: document.getElementById('emp-salary').innerText,
    };

    console.log('Updated Data:', updatedData);  // Log to check the structure of the data

    const employee_id = document.getElementById('emp-id').innerText;
    const url = `http://localhost:5500/api/employees/update/${employee_id}`;

    // Make sure the URL is correct
    console.log('API URL:', url);

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        const result = await response.json();

        if (response.ok) {
            console.log("Employee Updated : ", result);
            alert("Employee updated successfully!")
        } else {
            console.error('Error:', result.error);
            alert('Failed to update ' + result.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong');
    }

    document.querySelectorAll('.editable').forEach(span => {
        span.removeAttribute('contenteditable');
        span.style.border = 'none';
    });
    document.getElementById('edit-button').style.display = 'inline-block';
    document.getElementById('save-button').style.display = 'none';
}