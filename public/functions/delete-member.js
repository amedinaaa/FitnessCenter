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
