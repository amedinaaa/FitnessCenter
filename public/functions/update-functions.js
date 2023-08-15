// Fills out the update member form after a member is selected.
async function fillUpdateMemberForm (id) {
    let response = await fetch(`/member-by-id/${id}`);
    let data = await response.json();
    d = new Date(data.join_date);
    date = d.toISOString().split("T")[0];
    document.getElementById('update_name').value = data.name;
    document.getElementById('update_email').value = data.email;
    document.getElementById('update_phone').value = data.phone;
    document.getElementById('update_date').value = date;
  }