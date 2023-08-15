// Global delete functions for our entities.

function deleteMember(id) {
    const data = {
        member_id: id
    };
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", "/delete-member", false );
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send( JSON.stringify(data) );
    window.location.reload();
}

function deleteEquipment(id) {
    const data = {
        equipmentID: id
    };
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", "/delete-equipment", false );
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send( JSON.stringify(data) );
    window.location.reload();
}

function deleteActivity(id) {
    const data = {
        activityID: id
    };
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", "/delete-activity", false );
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send( JSON.stringify(data) );
    window.location.reload();
}

async function deleteReservation(id) {
    const data = {
        reservationID: id
    };
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "DELETE", "/delete-reservation", false );
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send( JSON.stringify(data) );
    window.location.reload();
}