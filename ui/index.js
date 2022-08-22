function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://127.0.0.1:8000/MeetingForm/GetAll");
    xhttp.send();
    xhttp.onreadystatechange = function() {
   
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['id']+'</td>';
          trHTML += '<td>'+object['ToplantiKonusu']+'</td>';
          trHTML += '<td>'+object['Tarih']+'</td>';
          trHTML += '<td>'+object['BaslangicSaati']+'</td>';
          trHTML += '<td>'+object['BitisSaati']+'</td>';
          trHTML += '<td>'+object['Katilimcilar']+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showMeetingEditBox('+object['id']+')">Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="MeetingDelete('+object['id']+')">Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
   
  }
  
  loadTable();

  function showMeetingCreateBox() {
    Swal.fire({
      title: 'Toplantı Oluştur',
      stopKeydownPropagation: false,
      html:
        '<input id="id" type="hidden">' +
        '<input id="ToplantiKonusu" class="swal2-input" placeholder="ToplantiKonusu">' +
        '<input id="Tarih" class="swal2-input" placeholder="Tarih">' +
        '<input id="BaslangicSaati" class="swal2-input" placeholder="BaslangicSaati">' +
        '<input id="BitisSaati" class="swal2-input" placeholder="BitisSaati">' +
        '<input id="Katilimcilar" class="swal2-input" placeholder="Katilimcilar">',
      focusConfirm: false,

      preConfirm: () => {
        meetingCreate();
      }
    })
  }
  
  function meetingCreate() {
    const ToplantiKonusu = document.getElementById("ToplantiKonusu").value;
    
    const Tarih = document.getElementById("Tarih").value;
   const BaslangicSaati = document.getElementById("BaslangicSaati").value;
   const BitisSaati = document.getElementById("BitisSaati").value;
    const Katilimcilar = document.getElementById("Katilimcilar").value;
    const xhttp = new XMLHttpRequest();

    const login = 'http://127.0.0.1:8000/MeetingForm/Register';
    fetch(login, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        "ToplantiKonusu": ToplantiKonusu,  "Katilimcilar": Katilimcilar,"BaslangicSaati": BaslangicSaati,"BitisSaati": BitisSaati,"Tarih": Tarih,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
     
        if (data.error) {
          alert("Error"); 
        } else {
     loadTable();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function showMeetingEditBox(id) {
    console.log(id);
    const regıster = 'http://127.0.0.1:8000/MeetingForm/Get/'+id;
    fetch(regıster, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Swal.fire({
                title: 'Güncelle',
                html:
                  '<input id="id" type="hidden" value='+data['id']+'>' +
                  '<input id="ToplantiKonusu" class="swal2-input" placeholder="Toplantı Konusu" value="'+data['ToplantiKonusu']+'">' +
                  '<input id="Tarih" class="swal2-input" placeholder="Tarih" value="'+data['Tarih']+'">' +
                  '<input id="BaslangicSaati" class="swal2-input" placeholder="Başlangıç Saati" value="'+data['BaslangicSaati']+'">' +
                  '<input id="BitisSaati" class="swal2-input" placeholder="bitiş Saati" value="'+data['BitisSaati']+'">' +
                  '<input id="Katilimcilar" class="swal2-input" placeholder="Katılımcılar" value="'+data['Katilimcilar']+'">' ,
                focusConfirm: false,
                preConfirm: () => {
                  MeetingEdit();
                }
              })
        if (data.error) {
          alert("Error");
        } else {
     //loadTable();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  
  }
  
  function MeetingEdit() {
    const id = document.getElementById("id").value;
    const ToplantiKonusu = document.getElementById("ToplantiKonusu").value;
    const Tarih = document.getElementById("Tarih").value;
    const BaslangicSaati = document.getElementById("BaslangicSaati").value;
    const BitisSaati = document.getElementById("BitisSaati").value;
    const Katilimcilar = document.getElementById("Katilimcilar").value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:8000/MeetingForm/Update/"+id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, "ToplantiKonusu": ToplantiKonusu, "Tarih": Tarih, "BaslangicSaati": BaslangicSaati, "BitisSaati": BitisSaati, "Katilimcilar": Katilimcilar, 
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }

  
function MeetingDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://127.0.0.1:8000/MeetingForm/Delete/"+id);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id
    }));
    xhttp.onreadystatechange = function() {
 
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      
    };
  }