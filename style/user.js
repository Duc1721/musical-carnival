table_device = document.getElementById("tablestate1");
document.getElementById('headerbang').style.display = 'none'
document.getElementById('tablestate1').style.display = 'none' 
iduser =  localStorage.getItem("in_id")
trove = document.getElementById('btnthoat')
roomuser = document.getElementById('roomuser')
thietbi = document.getElementById('thietbi')
const firebaseConfig = {
    apiKey: "AIzaSyAEqi81NFMPBJGxWRy7QtQv961efPzL9LA",
    authDomain: "hellodatn.firebaseapp.com",
    databaseURL: "https://hellodatn-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hellodatn",
    storageBucket: "hellodatn.appspot.com",
    messagingSenderId: "559705579450",
    appId: "1:559705579450:web:3421e5377912259256c783",
    measurementId: "G-YK901S5FXQ"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
function toggleStatea(idnha, idphong, idthietbi, trangthai) {
    if (trangthai == 0) {
        trangthai = 1;

    } else if (trangthai == 1) {
        trangthai = 0;
    } else {
        swal("HUHU!", "CẬP NHẬT DỮ LIỆU NHANH LÊN!", "error");
    }
    trangthai_mahoa = encode_data(trangthai)
    newPush_trangthai = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("onoff")
    newPush_trangthai.set(trangthai_mahoa);
}
window.onload = function()
{
   vaonha()
};
function dangxuat(){
    swal({
		title: "Xác nhận đăng xuất",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Đồng ý',
		cancelButtonText: "Không, hủy yêu cầu!",
		closeOnConfirm: true,
		closeOnCancel: true
	},
	function(isConfirm){
    if (isConfirm){
        window.location.href = './login.html';
    } else {}
	});
   
}

room = document.getElementById("phong");
function vaonha(){
    window.scrollTo(0, 0);
    document.getElementById('btnthoat').style.display = 'none' 
    document.getElementById('headerbang').style.display = 'none' 
    document.getElementById('tablestate1').style.display = 'none'
    document.getElementById('roomuser').style.display = 'block' 
    document.getElementById('phong').style.display = ''
    database.ref("ADMIN").child(iduser).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        room.innerHTML = ''
        for (var idphong_user in ketqualangnghe) {
            tennha = decode_data(ketqualangnghe.namenha)
            if (idphong_user != "namenha") {
                phong_fb = ketqualangnghe[idphong_user]
                for (var tenphong in phong_fb) {
                    if (tenphong == "namephong") {
                        tenphong_user = decode_data(phong_fb.namephong)
                        room.innerHTML += `<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="vaophong('${iduser}','${tennha}','${idphong_user}')" >
                                                <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong_user}</b></h5>
                                            </div>`         
            } 
        }
    }
    }
    document.getElementById("getten").innerText = tennha + ": DANH SÁCH PHÒNG "
    document.getElementById("getten").innerHTML += `&ensp;<span style="font-size:1.7rem;" class="nutchucnang" id="doitennha" title="Đổi tên nhà" data-toggle="collapse" data-target="#doitennha${iduser}"><i class="fas fa-pen"></i></span>
                                                    <div id="doitennha${iduser}" class="collapse">
                                                        <input id="input${iduser}"   maxlength="20" style="width:80%;" placeholder="Nhập tên nhà mới">
                                                        <button onclick="luutennha('${iduser}')"><i class="fad fa-check"></i></button>
                                                    </div>`
                                                    
    
    room.innerHTML += `<div class="gridchucnang">
                            <div onclick="addnewRoom1('${iduser}','${tennha}')" class="nutchucnang">
                                <i class="fas fa-plus" title="Thêm phòng"></i></div>
                            <div onclick="opendelRoom()" class="nutchucnang">
                                 <i class="fas fa-trash" title="Xóa phòng"></i></div>
                            <div onclick="openeditRoom()" class="nutchucnang">
                                 <i class="fas fa-pen" title="Đổi tên phòng"></i></div>
                            <div onclick="openadddevice()" class="nutchucnang">
                                 <i class="fas fa-plug" title="Thêm thiết bị"></i></div>
                       </div>`
           
})
}
function vaophong(idnha, tennha, idphong){
    trove.addEventListener('click', function(e) {
        vaonha()
    });
    stt=0
    window.scrollTo(0, 0);
    table_device.innerHTML ="";
    document.getElementById('btnthoat').style.display = 'block'
    document.getElementById('phong').style.display = 'none'
    document.getElementById('headerbang').style.display = '' 
    document.getElementById('tablestate1').style.display = ''
    database.ref("ADMIN").child(idnha).child(idphong).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        for (var idthietbi in ketqualangnghe) {
            if (idthietbi != "namephong") {
                for (var tenphong in ketqualangnghe) {
                    if (tenphong == "namephong") {
                        name_phong_fb = decode_data(ketqualangnghe.namephong)
                        thietbi_fb = ketqualangnghe[idthietbi]
                            }
                        }
                        name_thietbi_fb = decode_data(thietbi_fb.namethietbi)
                        phanloai_thietbi_fb = decode_data(thietbi_fb.phanloai)
                        trangthai_thietbi_fb = decode_data(thietbi_fb.trangthai)
                        stt++
                        if(phanloai_thietbi_fb == "Thiết bị"){
                            table_device.innerHTML +=  `<tr style="text-align: center">
                                                            <td>${stt}</td>
                                                            <td>${idnha}</td>
                                                            <td>${tennha}</td>
                                                            <td>${name_phong_fb}</td>
                                                            <td>${name_thietbi_fb}</td>
                                                            <td>${phanloai_thietbi_fb}</td>
                                                            <td>${trangthai_thietbi_fb}</td>
                                                            <td><button class="btn-outline-dark"><i class="fas fa-power-off" onclick="toggleStatea('${idnha}', '${idphong}', '${idthietbi}','${trangthai_thietbi_fb}')" title="Bật-tắt thiết bị"></i></button>
                                                            <button class="btn-outline-dark" data-toggle="collapse" data-target="#retype_device${idnha}${idphong}${idthietbi}" title="Phân loại"><i class="fas fa-sunset"></i></button> 
                                                            <button class="btn-outline-dark"><i class="far fa-trash-alt" onclick="xoathietbi('${idnha}', '${tennha}', '${idphong}','${idthietbi}')" title="Xóa thiết bị"></i></button>
                                                            <button class="btn-outline-dark" ><i class="fas fa-pen" data-toggle="collapse" data-target="#rename_device${idnha}${idphong}${idthietbi}" title="Đổi tên thiết bị"></i></button>
                                                            <div id="rename_device${idnha}${idphong}${idthietbi}" class="collapse">
                                                                <input id="input${idnha}${idphong}${idthietbi}"  style="width:80%;height:2.4rem"  maxlength="20" placeholder="Nhập tên thiết bị mới"><button class="btncus" id="check${idnha}${idphong}${idthietbi}" onclick="doitenthietbi('${idnha}','${idphong}','${idthietbi}', '${tennha}')"><i class="fad fa-check"></i></button>
                                                            </div>
                                                            <div class="collapse" id="retype_device${idnha}${idphong}${idthietbi}">
                                                            <h5 class="h5custom">  
                                                                <label><input type="radio" name="radgroup"  onclick="if(this.checked){phanloaithietbi('${idnha}','${idphong}','${idthietbi}','${tennha}')}" checked> Thiết bị</label>
                                                                <label><input type="radio" name="radgroup"  onclick="if(this.checked){phanloaicambien('${idnha}','${idphong}','${idthietbi}','${tennha}')}"> Cảm biến</label></h5>
                                                            </div>
                                                            </td>
                                                        </tr>`
                        } else {
                            table_device.innerHTML +=  `<tr style="text-align: center">
                            <td>${stt}</td>
                            <td>${idnha}</td>
                            <td>${tennha}</td>
                            <td>${name_phong_fb}</td>
                            <td>${name_thietbi_fb}</td>
                            <td>${phanloai_thietbi_fb}</td>
                            <td>${trangthai_thietbi_fb}</td>
                            <td><button class="btn-outline-dark" ><i class="far fa-trash-alt" onclick="xoathietbi('${idnha}', '${tennha}', '${idphong}','${idthietbi}')" title="Xóa thiết bị"></i></button>
                            <button class="btn-outline-dark" data-toggle="collapse" data-target="#retype_device${idnha}${idphong}${idthietbi}" title="Phân loại"><i class="fas fa-sunset"></i></button> 
                            <button class="btn-outline-dark" ><i class="fas fa-pen" data-toggle="collapse" data-target="#rename_device${idnha}${idphong}${idthietbi}" title="Đổi tên thiết bị"></i></button>
                            <div id="rename_device${idnha}${idphong}${idthietbi}" class="collapse">
                                <input id="input${idnha}${idphong}${idthietbi}" style="width:80%;height:2.4rem"  maxlength="20" placeholder="Nhập tên thiết bị mới"><button class="btncus" id="check${idnha}${idphong}${idthietbi}" onclick="doitenthietbi('${idnha}','${idphong}','${idthietbi}', '${tennha}')"><i class="fad fa-check"></i></button>
                            </div>
                            <div class="collapse" id="retype_device${idnha}${idphong}${idthietbi}">
                              <h5 class="h5custom">  
                                <label><input type="radio" name="radgroup"  onclick="if(this.checked){phanloaithietbi('${idnha}','${idphong}','${idthietbi}','${tennha}')}" checked> Thiết bị</label>
                                <label><input type="radio" name="radgroup"  onclick="if(this.checked){phanloaicambien('${idnha}','${idphong}','${idthietbi}','${tennha}')}"> Cảm biến</label></h5>
                            </div>

                            </td>
                        </tr>`
                       // thietbi.innerHTML += `<div>hello</div>`
                        }
                    }
        }
        document.getElementById("getten").innerText = "BẢNG DANH SÁCH THIẾT BỊ"
    });
}

function closeAddnewHomeuser() {
    document.getElementById('addHome').style.display = 'none'
}
function opendelRoom(){
    database.ref("ADMIN").child(iduser).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        room.innerHTML = ''
        for (var idphong_user in ketqualangnghe) {
            tennha = decode_data(ketqualangnghe.namenha)
            if (idphong_user != "namenha") {
                phong_fb = ketqualangnghe[idphong_user]
                for (var tenphong in phong_fb) {
                    if (tenphong == "namephong") {
                        tenphong_user = decode_data(phong_fb.namephong)
                        room.innerHTML += `<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="deleteRoomU('${iduser}','${idphong_user}')" >
                                                <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong_user}</b></h5>
                                                </div>`         
                    } 
                }
            }
        }
        room.innerHTML += `<div class="gridchucnang">
        <div onclick="addnewRoom1('${iduser}','${tennha}')" class="nutchucnang">
            <i class="fas fa-plus" title="Thêm phòng"></i></div>
        <div onclick="vaonha()" class="nutchucnang">
            <i class="fas fa-trash" title="Tắt xóa phòng" style="color: black;"></i></div>
        <div onclick="openeditRoom()" class="nutchucnang">
            <i class="fas fa-pen" title="Sửa tên phòng"></i></div>
        <div onclick="openadddevice()" class="nutchucnang">
            <i class="fas fa-plug" title="Thêm thiết bị"></i></div>
        </div>`
    })  
} 
function deleteRoomU(home, room){
	swal({
		title: "Bạn chắc chắn muốn xóa?",
		text: "Bạn sẽ không thể hổi phục lại dữ liệu!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Đồng ý, xóa!',
		cancelButtonText: "Không, hủy yêu cầu!",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm){
    if (isConfirm){
      swal("Đã xóa!", "Dữ liệu của bạn đã được xóa!", "success");
      newRemoteRef = database.ref("ADMIN").child(home).child(room)
      newRemoteRef.remove();
      opendelRoom()
    } else {
      swal("Hủy", "Dữ liệu của bạn được bảo toàn!", "error");
      opendelRoom()
    }
	});
}
function openeditRoom(){
    database.ref("ADMIN").child(iduser).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        room.innerHTML = ''
        for (var idphong_user in ketqualangnghe) {
            tennha = decode_data(ketqualangnghe.namenha)
            if (idphong_user != "namenha") {
                phong_fb = ketqualangnghe[idphong_user]
                for (var tenphong in phong_fb) {
                    if (tenphong == "namephong") {
                        tenphong_user = decode_data(phong_fb.namephong)
                        room.innerHTML += `<div id="rchon${iduser}${idphong_user}">
                        <div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="modeEdit('${iduser}','${idphong_user}','${tenphong_user}')" id="e${iduser}${idphong_user}">
                                                <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong_user}</b></h5>
                                            </div>
                        </div>`         
                    } 
                }
            }
        }
        room.innerHTML += `<div class="gridchucnang">
        <div onclick="addnewRoom1('${iduser}','${tennha}')" class="nutchucnang">
            <i class="fas fa-plus" title="Thêm phòng"></i></div>
        <div onclick="opendelRoom()" class="nutchucnang">
            <i class="fas fa-trash" title="Xóa phòng"></i></div>
        <div onclick="vaonha()" class="nutchucnang">
            <i class="fas fa-pen" title="Tắt sửa tên phòng"  style="color: black;"></i></div>
        <div onclick="openadddevice()" class="nutchucnang">
            <i class="fas fa-plug" title="Thêm thiết bị"></i></div>
        </div>`
    })
}
function modeEdit(idnha, idphong, tenphong){
    iderchon = "rchon" + idnha + idphong
    rchon = document.getElementById(iderchon)

    rchon.innerHTML =`<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                            class="resize" id="e${idnha}${idphong}">
                            <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong}</b></h5>
                       </div>`
    ider = "e" + idnha + idphong
    ideroom = document.getElementById(ider)
    ideroom.innerHTML = `<div>
                            <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong}</b></h5>
                            <input id="input${idnha}${idphong}"  style="padding:0.5rem;font-size:1.25rem;position:absolute;bottom:2.4rem;outline:none"
                                type="nameHome" maxlength="20" placeholder="Nhập tên phòng mới">
                            <button style="padding:0.3rem;width:100%;position:absolute;bottom:0" onclick="luutenphong('${idnha}','${idphong}')">
                            <i class="fad fa-check"></i></button>
                        </div>`
  }

function luutenphong(idnha, idphong){
    idnhapten = "input"+idnha+idphong;
    tenmoi = document.getElementById(idnhapten).value
    if(tenmoi.length > 5){
        newPush_nameRoom = database.ref("ADMIN").child(idnha).child(idphong).child("namephong")
        newPush_nameRoom.set(encode_data(tenmoi));
        swal("Thành công!", "Tên phòng đã được đổi!", "success");
        openeditRoom()
    } else {
        swal("Lưu ý!", "Tên phòng phải lớn hơn 5 ký tự!", "error");
        openeditRoom()
    }
}
function luutennha(idnha){
    idnhapten = "input"+idnha;
    tenmoi = document.getElementById(idnhapten).value
    if(tenmoi.length > 5){
        newPush_nameRoom = database.ref("ADMIN").child(idnha).child("namenha")
        newPush_nameRoom.set(encode_data(tenmoi));
        swal("Thành công!", "Tên nhà đã được đổi!", "success");
        vaonha()
    } else {
        swal("Lưu ý!", "Tên nhà phải lớn hơn 5 ký tự!", "error");
        vaonha()
    }
}

function openadddevice() {
    database.ref("ADMIN").child(iduser).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();
        room.innerHTML = ''
        for (var idphong_user in ketqualangnghe) {
            tennha = decode_data(ketqualangnghe.namenha)
            if (idphong_user != "namenha") {
                phong_fb = ketqualangnghe[idphong_user]
                for (var tenphong in phong_fb) {
                    if (tenphong == "namephong") {
                        tenphong_user = decode_data(phong_fb.namephong)
                        room.innerHTML += `<div id="rchon${iduser}${idphong_user}">
                        <div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                                                class="resize" onclick="modead3('${iduser}','${idphong_user}','${tenphong_user}')" id="e${iduser}${idphong_user}">
                                                <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong_user}</b></h5>
                                            </div>
                        </div>`         
                    } 
                }
            }
        }
        room.innerHTML += `<div class="gridchucnang">
        <div onclick="addnewRoom1('${iduser}','${tennha}')" class="nutchucnang">
            <i class="fas fa-plus" title="Thêm phòng"></i></div>
        <div onclick="opendelRoom()" class="nutchucnang">
            <i class="fas fa-trash" title="Xóa phòng"></i></div>
        <div onclick="openeditRoom()" class="nutchucnang">
            <i class="fas fa-pen" title="Đổi tên phòng"></i></div>
        <div onclick="vaonha()" class="nutchucnang">
            <i class="fas fa-plug" title="Tắt hêm thiết bị" style="color: black;"></i></div>
        </div>`
    })
}

function modead3(idnha, idphong, tenphong){
    iderchon = "rchon" + idnha + idphong
    rchon = document.getElementById(iderchon)

    rchon.innerHTML =`<div style="background-image: url(phongmacdinh.jpg);background-size: contain;" 
                            class="resize" id="e${idnha}${idphong}">
                            <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong}</b></h5>
                       </div>`
    ider = "e" + idnha + idphong
    ideroom = document.getElementById(ider)
    ideroom.innerHTML = `<div>
                            <h5  class="chucnang" style="font-size: 1rem;" ><b>${tenphong}</b></h5>
                            <input id="thietbithem${idnha}${idphong}"  style="padding:0.4rem;font-size:1.5rem;position:absolute;bottom:2.9rem;outline:none;width:100%; text-align:center;"
                                type="number" placeholder="Nhập số thiết bị" max ='8' min= '1' maxlength = "1"
                                oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);">
                            <button style="padding:0.3rem;width:100%;position:absolute;bottom:0" onclick="themthietbi('${idnha}','${idphong}')">
                            <i class="fad fa-check"></i></button>
                        </div>`

}
function themthietbi(idnha, idphong){
    sothietbidaco = -1
    idthem = "thietbithem"+idnha+idphong
    var sothietbithem = parseInt(document.getElementById(idthem).value)
    database.ref("ADMIN").child(idnha).child(idphong).once('value', async function(snap) {
        var ketqualangnghe = await snap.val();     
        for (var idthietbi in ketqualangnghe){
            sothietbidaco++
        }
        if((sothietbithem+sothietbidaco)>8){
            swal("Cảnh báo!", "Số lượng thiết bị vượt giới hạn, bạn chỉ có thể có tối đa 8 thiết bị trong 1 phòng!")
        } else {
            for(var i = sothietbidaco; i < sothietbithem+sothietbidaco; i++){
                idthietbi = "PL" + randomString1(4, "N"); 
                name_device = "Thiết bị" + " " + randomString1(4, "N");
                phanloai = "Thiết bị"
                newPushDevice = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi)
                newPushDevice.set({
                    namethietbi: encode_data(name_device),
                    phanloai:  encode_data(phanloai),
                    onoff:  encode_data("onoff"),
                    trangthai:  encode_data("Đợi cập nhật từ GATEWAY")
                });
                }
            swal("Thành công!", "Đã thêm thiết bị!", "success");
            openadddevice()
        }

    })  
}
function xoathietbi(idnha, tennha, idphong, idthietbi) {
    swal({
		title: "Bạn chắc chắn muốn xóa?",
		text: "Bạn sẽ không thể hổi phục lại dữ liệu!",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: '#DD6B55',
		confirmButtonText: 'Đồng ý, xóa!',
		cancelButtonText: "Không, hủy yêu cầu!",
		closeOnConfirm: false,
		closeOnCancel: false
	},
	function(isConfirm){
    if (isConfirm){
      swal("Thành công!", "Dữ liệu đã được xóa!", "success");
      newRemoteRef = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi)
      newRemoteRef.remove();
      vaophong(idnha, tennha, idphong)
    } else {
      swal("Hủy", "Dữ liệu được bảo toàn!", "error");
    }
	});
}
function doitenthietbi(idnha, idphong, idthietbi, tennha){
    idnhaptenmoi = "input"+idnha+idphong+idthietbi;
    tenmoi = document.getElementById(idnhaptenmoi).value
    if(tenmoi.length > 5){
    newPush_nameDevice = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("namethietbi")
    newPush_nameDevice.set(encode_data(tenmoi));
    vaophong(idnha, tennha, idphong)
    swal("Thành công!", "Tên thiết bị đã được đổi!", "success");
    } else {
        swal("Lưu ý!", "Tên thiết bị phải lớn hơn 5 ký tự!", "error");
    }
}
function phanloaithietbi(idnha, idphong, idthietbi, tennha) {
    newPush_phanloai = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("phanloai")
    newPush_phanloai.set(encode_data("Thiết bị")); 
    swal("Thành công!", "Thay đổi phân loại là thiết bị!", "success");
    vaophong(idnha, tennha, idphong)
} 
function phanloaicambien(idnha, idphong, idthietbi, tennha) {
    newPush_phanloai = database.ref("ADMIN").child(idnha).child(idphong).child(idthietbi).child("phanloai")
    newPush_phanloai.set(encode_data("Cảm biến")); 
    swal("Thành công!", "Thay đổi phân loại là cảm biến!", "success");
    vaophong(idnha, tennha, idphong)
}

function randomString1(len, an) {
    an = an && an.toLowerCase();
    var str = "",
        i = 0,
        min = an == "a" ? 10 : 0,
        max = an == "n" ? 10 : 62;
    for (; i++ < len;) {
        var r = Math.random() * (max - min) + min << 0;
        str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
    }
    return str;
} 
function addnewRoom1(idnha, nameNha) {
    conentaoidhaykhong = 1;
    document.getElementById('addHome').style.display = 'block'
    document.getElementById("idnewHome").innerHTML = idnha;
    document.getElementById('themroom').innerHTML = "";
    document.getElementById("idnewphong").innerHTML = "";
    document.getElementById("name_home").value = nameNha;
    document.getElementById('name_home').disabled = true;
    document.getElementById('nameRoom').disabled = false;
    document.getElementById("nameRoom").value = "";
    document.getElementById("add_device_modal").innerHTML = `
    <button onclick="roomPlus1(${conentaoidhaykhong},0)" class="btnadd" required>XÁC NHẬN SỐ THIẾT BỊ</button>
    `;    
}
var allmang = []
function roomPlus1(conentaoidhaykhong,id_room) {
    name_home = document.getElementById("name_home").value
    if(name_home.length > 5){
        id_home = document.getElementById("idnewHome").textContent
        nameRoom_new = document.getElementById("nameRoom").value;
        if(nameRoom_new.length > 5){
            num_device = document.getElementById("valueRoomNumber").value;
            document.getElementById('themroom').innerHTML = ""
            if(conentaoidhaykhong=='1'){
                var newidroom = randomString1(4, "N")
                document.getElementById("idnewphong").innerHTML = newidroom
            } 
            else{
                newidroom = id_room;
            }
            var biendemthietbi=0
            database.ref("ADMIN").child(id_home).child(newidroom).once('value', async function(snap) {
                var ketqualangnghe = await snap.val();    
                  
                for (idthietbi in ketqualangnghe){
                    biendemthietbi ++
                    
                }

                if(biendemthietbi < 0){biendemthietbi=1}
                if(+num_device +biendemthietbi <= 9){

                allmang = []
                object_nha = {
                    name_nha: name_home,
                    id_nha: id_home 
                }
                object_phong = {
                    name_phong: nameRoom_new,
                    id_phong: newidroom
                }
                
                allmang.push(object_nha)
                allmang.push(object_phong)
                for (var i = biendemthietbi ; i < +num_device +biendemthietbi; i++) {
                    soid =  randomString1(4, "N");
                    var newNameThietbi = 'id="Thiết bị ' + soid + '"';
                    var idNew_NameThietbi = "Thiết bị " + soid;
                    var newithietbi = "PL" + soid;
                    id = 'id="PL' + soid + '"';
                    id_phanloai = "phanloaithietbi" + soid;
                    divPhanLoai = `<div class="form-select" style= "width:10%">
                                    <select id="phanloaithietbi${soid}">
                                        <option value="Thiết bị">Thiết bị</option>
                                        <option value="Cảm biến">Cảm biến</option>
                                    </select>
                                    </div>`
                    divIDThietbi = '<input disabled type="nameHome" ' + id + 'style="width:70%">'
                    divNameThietbi = '<input type="nameHome" ' + newNameThietbi + ' style="width:20%;color:black;background-color:#47aedb87">'
                    document.getElementById('themroom').innerHTML += divNameThietbi + divIDThietbi + divPhanLoai;
                    document.getElementById(idNew_NameThietbi).setAttribute('value', idNew_NameThietbi)
                    document.getElementById(newithietbi).setAttribute('value', "ID: " + newithietbi)
                    object_thietbi = {
                        id_name_device: idNew_NameThietbi,
                        id_device: newithietbi,
                        id_phanloai: id_phanloai
                    }
                    allmang.push(object_thietbi)
                   
                }

            }
            else{
                swal("Cảnh báo!", "Số lượng thiết bị vượt giới hạn, bạn chỉ có thể có tối đa 8 thiết bị trong 1 phòng!")
            }
                document.getElementById('themroom').innerHTML += `<br><button class="btnadd1" onclick="oke_firebase1()"><b>LƯU THÔNG TIN PHÒNG</b></button>`   
            });   
        } else {
            swal("Lưu ý!", "Tên phòng phải lớn hơn 5 ký tự!", "error");
        } 
    } else {
        swal("Lưu ý!", "Tên nhà phải lớn hơn 5 ký tự!", "error");
    }
}

function oke_firebase1() {
    name_phong = document.getElementById("nameRoom").value;
    name_nha = document.getElementById("name_home").value;
    if(name_nha.length>5 && name_phong.length>5){
        swal("Tốt lắm!", "Bạn đã lưu thông tin phòng!", "success");
        document.getElementById('name_home').disabled = true;
        name_phong = document.getElementById("nameRoom").value;
        name_nha = document.getElementById("name_home").value;
        id_nha = allmang[0].id_nha
        id_phong = allmang[1].id_phong
        document.getElementById("nameRoom").value = "";
        for (let i = 2; i < allmang.length; i++) {
            id_name_device = allmang[i].id_name_device
            id_device = allmang[i].id_device
            id_phanloai = allmang[i].id_phanloai
            name_device = document.getElementById(id_name_device).value;
            phanloai = document.getElementById(id_phanloai).value;
            newPushDevice = database.ref("ADMIN").child(id_nha).child(id_phong).child(id_device)
            newPushDevice.set({
                namethietbi: encode_data(name_device),
                phanloai:  encode_data(phanloai),
                onoff:  encode_data("onoff"),
                trangthai:  encode_data("Đợi cập nhật từ GATEWAY")
            });
            newPushHome = database.ref("ADMIN").child(id_nha).child("namenha")
            newPushHome.set( encode_data(name_nha));
            newPushRoom = database.ref("ADMIN").child(id_nha).child(id_phong).child("namephong")
            newPushRoom.set( encode_data(name_phong));

        }
        document.getElementById('themroom').innerHTML = "";
        document.getElementById("idnewphong").innerHTML = "";
        vaonha()
    } else {
        swal("Lưu ý", "Tên nhà và tên phòng phải lớn hơn 5 ký tự!", "error");
    }
}
//////////////////////////////////////////
var sliders = document.getElementsByClassName("round-slider");
for (let i = 0; i < sliders.length; i++) {
	sliders[i].addEventListener("mousedown", function(event) {
		sliders[i].onmousemove = function(event) {
			if (event.buttons == 1 || event.buttons == 3) {
				round_slider_tune(event);
			}
		}
	});
}

function round_slider_tune(event) {
	let eventDoc = (event.target && event.target.ownerDocument) || document,
		doc = eventDoc.documentElement,
		body = eventDoc.body;
	event.pageX = event.clientX +
		  (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
		  (doc && doc.clientLeft || body && body.clientLeft || 0);
	event.pageY = event.clientY +
		  (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
		  (doc && doc.clientTop  || body && body.clientTop  || 0 );
	let output = event.target.getElementsByClassName("selection")[0],
		text = event.target.getElementsByClassName("holder")[0],
		styleafter = document.head.appendChild(document.createElement("style")),
		elpos = event.target.getBoundingClientRect(),
		cX = elpos.width / 2,
		cY = elpos.height / 2,
		eX = event.pageX - elpos.left,
		eY = event.pageY - elpos.top,
		dX = 0,
		dY = 0,
		angle = Math.atan2(cX - eX, cY - eY) * (180 / Math.PI),
		value = 100;
	if (Math.abs(eX - cX) >= Math.abs(eY - cY)) { // 110 90
		dX = 150 / 2 + Math.sign(eX - cX) * 150 / 2;
		dY = 150 / 2 + (eY - cY) / Math.abs(eX - cX) * 150 / 2;
	} else {
		dX = 150 / 2 + (eX - cX) / Math.abs(eY - cY) * 150 / 2;
		dY = 150 / 2 + Math.sign(eY - cY) * 150 / 2;
	}
	dX = Math.round(dX / 150 * 100)
	dY = Math.round(dY / 150 * 100)
	if (0 <= dX && dX < 50 && dY == 0) {
		output.style = "clip-path: polygon(" + dX + "% " + dY + "%, 50% 0%, 50% 50%);";
		value = Math.round((50 - dX) / 50 * 12.5);
	} else if (dX == 0 && 0 <= dY && dY <= 100) {
		output.style = "clip-path: polygon(" + dX + "% " + dY + "%, 0% 0%, 50% 0%, 50% 50%);";
		value = Math.round(12.5 + dY / 100 * 25);
	} else if (0 <= dX && dX <= 100 && dY == 100) {
		output.style = "clip-path: polygon(" + dX + "% " + dY + "%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
		value = Math.round(37.5 + dX / 100 * 25);
	} else if (dX == 100 && 0 <= dY && dY <= 100) {
		output.style = "clip-path: polygon(" + dX + "% " + dY + "%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
		value = Math.round(62.5 + (100 - dY) / 100 * 25);
	} else if (50 <= dX && dX <= 100 && dY == 0) {
		output.style = "clip-path: polygon(" + dX + "% " + dY + "%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 0%, 50% 50%);";
		value = Math.round(87.5 + (100 - dX) / 50 * 12.5);
	}
	styleafter.innerHTML = ".round-slider .selection:after {transform: rotate(" + -angle + "deg);}";
	let hue = Math.floor(value / 100 * 120),
		saturation = Math.abs(value - 50);
	text.innerHTML = value + "%";
	text.style = "color: hsl(" + hue + ", 100%, " + saturation + "%);";
}