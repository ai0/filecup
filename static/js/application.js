$(function() { 
	$("#info_btn").popover({title:'<strong>使用须知</strong>',content:'<ul><li>请勿上传<span class="badge badge-important">违反法律法规</span>的文件。</li><li>为了更快的速度，使用<span class="badge badge-info">KVDB</span>储存文件，仅限于分享小文件，单个文件大小不得超过<span class="badge badge-success">4MB</span>,再大罐子就破了。</li><li>仅限于<span class="badge badge-warning">临时文件分享</span>，文件有效期<span class="badge badge-info">48小时</span>。</li><li>吐槽罐子主人：<span class="label label-info">lesice#me.com</span></li></ul>'});
});

function fileSelected() {
	var file = document.getElementById('myfile').files[0];
	if (file) {
		if (file.size > 4 * 1024 * 1024){
			document.getElementById('fileName').value = '';
			document.getElementById('myfile').value = '';
			document.getElementById('error_msg').innerHTML ='文件超出4MB，请阅读须知。';
			document.getElementById('error_area').style.display="block";
		}
		else{
			document.getElementById('fileName').value=file.name;
			document.getElementById('error_area').style.display="none";
			document.getElementById('info_msg').innerHTML ='文件合法，可以开始入罐。';
			document.getElementById('info_area').style.display="block";
		}
	}
}

function uploadFile() {
	document.getElementById('info_area').style.display="none";
	var fn=document.getElementById('fileName').value;
	if(fn==""){
		document.getElementById('error_msg').innerHTML ='还未选择欲入罐的文件呢。';
		document.getElementById('error_area').style.display="block";
		return;
	}
	$(document.getElementById('sub_btn')).button("loading");
	document.getElementById('progress_area').style.display="block";
	
	var fd = new FormData();
    fd.append("myfile", document.getElementById('myfile').files[0]);
	var xhr = new XMLHttpRequest();
	xhr.upload.addEventListener("progress", uploadProgress, false);
	xhr.addEventListener("load", uploadComplete, false);
	xhr.addEventListener("error", uploadFailed, false);
	xhr.addEventListener("abort", uploadCanceled, false);
	xhr.open("POST", "");
	xhr.send(fd);
}

function uploadProgress(evt) {
	if (evt.lengthComputable) {
		var percentComplete = Math.round(evt.loaded * 100 / evt.total);
		document.getElementById('progress_bar').style.width = percentComplete.toString() + '%';
	}
	else {
		document.getElementById('progress_bar').style.width = '99%';
	}
}

function uploadComplete(evt) {
	$(document.getElementById('sub_btn')).button("complete");
	document.getElementById('file_url').innerHTML = evt.target.responseText;
	$(document.getElementById('upload_result')).modal('show');
}

function uploadFailed(evt) {
	document.getElementById('error_msg').innerHTML ='上传失败，请联系罐子主人。';
	document.getElementById('progress_area').style.display="none";
	document.getElementById('error_area').style.display="block";
}

function uploadCanceled(evt) {
	document.getElementById('error_msg').innerHTML ='上传异常终止，请联系罐子主人。';
	document.getElementById('progress_area').style.display="none";
	document.getElementById('error_area').style.display="block";
}