// Edit global varible
var selectedRow = null

// Form Submit Action
function onFormSubmit() {

    if (!validate()) {
        var formData = getFormData();

        if (selectedRow == null) {
            insertRowInTable(formData);
        } else {
            updateRecord(formData);
        }

        // reset all input to empty
        resetForm();
    } else {
        alert("Please provide all sections to continue")
    }
}

function validate() {
    var isValid = false;

    if (document.getElementById("name").value == "") {
        isValid = true;
    } else if (document.getElementById("email").value == "") {
        isValid = true;
    } else if (document.getElementById("gpa").value == "") {
        isValid = true;
    } else if (document.getElementById("age").value == "") {
        isValid = true;
    } else if (document.getElementById("degree").value == "") {
        isValid = true;
    }

    return isValid;
}

function getFormData() {
    var formData = {};

    // Get Values by id
    formData["name"] = document.getElementById("name").value;
    formData["email"] = document.getElementById("email").value;
    formData["gpa"] = document.getElementById("gpa").value;
    formData["age"] = document.getElementById("age").value;
    formData["degree"] = document.getElementById("degree").value;

    return formData;
}

function insertRowInTable(data) {
    var table = document.getElementById("stdlist").getElementsByTagName("tbody")[0];
    var newRow = table.insertRow(table.length);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = `<td><td>`;
    cell1.setAttribute("class", "id");
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = `<td class="name">${data.name}<td>`;
    cell2.setAttribute("class", "name");
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<td class="email">${data.email}<td>`;
    cell3.setAttribute("class", "email");
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<td class="age">${data.gpa}<td>`;
    cell4.setAttribute("class", "age");
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<td class="GPA">${data.age}<td>`;
    cell5.setAttribute("class", "GPA");
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<td class="degree">
    <div>${data.degree}</div>
    <div>
        <img src="icons/edit 1.svg" height="16" onclick="onEdit(this)"></img>
        <img src="icons/trash-2 1.svg" height="16" onclick="onDelete(this)"></img>
    </div>
    <td>`;
    cell6.setAttribute("class", "degree-1");
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gpa").value = "";
    document.getElementById("age").value = "";
    document.getElementById("degree").value = "";

    selectedRow = null;
    document.getElementById("submit").innerHTML = "Add Student";
    document.getElementById("submit").setAttribute("class", "submit-1");
}

// Edit Section
function onEdit(td) {

    document.getElementById("submit").innerHTML = "Edit Student";
    document.getElementById("submit").setAttribute("class", "submit-2");

    selectedRow = td.parentElement.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
    document.getElementById("gpa").value = selectedRow.cells[3].innerHTML;
    document.getElementById("age").value = selectedRow.cells[4].innerHTML;
    document.getElementById("degree").value = selectedRow.cells[5].children[0].innerHTML;
}

// Update Record
function updateRecord(formData) {
    selectedRow.cells[1].innerHTML = formData.name;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.gpa;
    selectedRow.cells[4].innerHTML = formData.age;
    selectedRow.cells[5].innerHTML = formData.degree;

    selectedRow.cells[5].innerHTML = `<td class="degree">
    <div>${formData.degree}</div>
    <div>
        <img src="icons/edit 1.svg" height="16" onclick="onEdit(this)"></img>
        <img src="icons/trash-2 1.svg" height="16" onclick="onDelete(this)"></img>
    </div>
    <td>`;
    selectedRow.cells[5].setAttribute("class", "degree-1");
}

// delete function
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement.parentElement;
        document.getElementById("stdlist").deleteRow(row.rowIndex);
        resetForm();
    }
}

function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("body-section");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td_name = tr[i].getElementsByTagName("td")[1];
        td_email = tr[i].getElementsByTagName("td")[2];
        td_degree = tr[i].getElementsByTagName("td")[5];
        if (td_name || td_email || td_degree) {
            txtName = td_name.textContent || td_name.innerText;
            txtEmail = td_email.textContent || td_email.innerText;
            txtDegree = td_degree.textContent || td_degree.innerText;
            if (txtName.toUpperCase().indexOf(filter) > -1
            || txtEmail.toUpperCase().indexOf(filter) > -1
             || txtDegree.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

const search = document.getElementById("search");
search.addEventListener("keyup", searchTable);