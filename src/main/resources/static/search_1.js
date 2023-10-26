


// //여기부터는 db에 읽어온 주소를 출력하는 구간입니다.

// // 주소좌표 변환 객체를 생성
// var geocoder = new kakao.maps.services.Geocoder();

// for (var i = 0; i < auctionMasters.length; i++) {
//     geocoder.addressSearch(auctionMasters[i].address, createMarkerCallback(i));
// }

// function createMarkerCallback(idx) {
//     return function (result, status) {
//         if (status === kakao.maps.services.Status.OK) {
//             var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
//             var marker = addMarker(coords, idx);
//             markers.push(marker);

//             if (idx === auctionMasters.length - 1) {
//                 map.setCenter(coords);
//             }
//         }
//     };
// }

// function addMarker(position, index) {
//     var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
//     var imageSize = new kakao.maps.Size(36, 37);
//     var imgOptions = {
//         spriteSize: new kakao.maps.Size(36, 691),
//         spriteOrigin: new kakao.maps.Point(0, (index * 46) + 10), //마커 이미지가 15까지 밖에 없음
//         offset: new kakao.maps.Point(13, 37)
//     };
//     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
//     var marker = new kakao.maps.Marker({
//         position: position,
//         image: markerImage,
//         map: map
//     });

//     return marker;
// }

// var listEl = document.getElementById('placesList');
// var fragment = document.createDocumentFragment();

// for (var i = 0; i < auctionMasters.length; i++) {
//     var itemEl = getListItem(i, auctionMasters[i]);
//     fragment.appendChild(itemEl);
// }

// listEl.innerHTML = ''; // 기존 목록을 비워서 초기화
// listEl.appendChild(fragment); // 새로운 목록으로 대체

// function getListItem(index, auctionMaster) {
//     var el = document.createElement('li');

//     var auctionKey = auctionMaster.auctionKey;
//     var roadName = auctionMaster.roadName;
//     var predictionPrice = auctionMaster.predictionPrice;

//     var itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
//         '<div class="info">' +
//         '   <h5>' + auctionKey + '</h5>';

//     if (roadName) {
//         itemStr += '    <span>' + roadName + '</span>' +
//             '   <span class="jibun gray">' + auctionMaster.address + '</span>';
//     } else {
//         itemStr += '    <span>' + auctionMaster.address + '</span>';
//     }

//     itemStr += '  <span class="tel">' + predictionPrice + '</span>' +
//         '</div>';

//     el.innerHTML = itemStr;
//     el.className = 'item';

//     return el;
// }

// var itemsPerPage = 15

// // 지도 위에 표시되고 있는 마커를 모두 제거합니다
// function removeMarker() {
//     for (var i = 0; i < markers.length; i++) {
//         markers[i].setMap(null);
//     }
//     markers = [];
// }

// // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
// function displayPagination(pagination) {
//     var paginationEl = document.getElementById('pagination'),
//         fragment = document.createDocumentFragment(),
//         i;

//     // 기존에 추가된 페이지번호를 삭제합니다
//     while (paginationEl.hasChildNodes()) {
//         paginationEl.removeChild(paginationEl.lastChild);
//     }

//     for (i = 1; i <= pagination.last; i++) {
//         var el = document.createElement('a');
//         el.href = "#";
//         el.innerHTML = i;

//         if (i === pagination.current) {
//             el.className = 'on';
//         } else {
//             el.onclick = (function (i) {
//                 return function () {
//                     pagination.gotoPage(i);
//                 }
//             })(i);
//         }

//         fragment.appendChild(el);
//     }
//     paginationEl.appendChild(fragment);
// }

// // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// // 인포윈도우에 장소명을 표시합니다
// function displayInfowindow(marker, title) {
//     var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

//     infowindow.setContent(content);

//     infowindow.open(map, marker);
// }


// // 검색결과 목록의 자식 Element를 제거하는 함수입니다
// function removeAllChildNods(el) {
//     while (el.hasChildNodes()) {
//         el.removeChild(el.lastChild);
//     }
// }

// var pagination = new daum.maps.services.pagination({
//     container: document.getElementById('pagination'), // 페이지네이션 엘리먼트를 지정
//     total: auctionMasters.length, // 전체 아이템 개수
//     range: 15, // 한 페이지에 표시할 아이템 개수
//     pagesPerRange: 5, // 페이지 범위에 표시할 페이지 수
//     currentPage: 1 // 초기 페이지
// });

// // 페이지 번호를 표시하고 페이지 이동을 처리
// displayPagination(pagination);






//여기부터는 db에 읽어온 주소를 출력하는 구간입니다.

// 주소좌표 변환 객체를 생성
// 주소 좌표 변환 객체를 생성// 주소 좌표 변환 객체를 생성
// var geocoder = new kakao.maps.services.Geocoder();
// var itemsPerPage = 15; // 한 페이지에 표시할 아이템 개수
// var listEl = document.getElementById('placesList');
// var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

// // auctionMasters 배열에서 각 아이템을 가져와서 목록을 만듭니다
// for (var i = 0; i < auctionMasters.length; i++) {
//     geocoder.addressSearch(auctionMasters[i].address, createMarkerCallback(i));
// }

// // 좌표로 변환한 값을 마커로 만듭니다
// function createMarkerCallback(idx) {
//     return function (result, status) {
//         if (status === kakao.maps.services.Status.OK) {
//             var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
//             var marker = addMarker(coords, idx);
//             markers.push(marker);

//             if (idx === auctionMasters.length - 1) {
//                 map.setCenter(coords);
//                 displayPagination();
//             }
//         }
//     };
// }

// // 마커의 이미지나 포지션을 설정합니다
// function addMarker(position, index) {
//     var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
//     var imageSize = new kakao.maps.Size(36, 37);
//     var imgOptions = {
//         spriteSize: new kakao.maps.Size(36, 691),
//         spriteOrigin: new kakao.maps.Point(0, (index * 46) + 10),
//         offset: new kakao.maps.Point(13, 37)
//     };
//     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
//     var marker = new kakao.maps.Marker({
//         position: position,
//         image: markerImage,
//         map: map
//     });

//     return marker;
// }

// // 검색결과 목록에 아이템을 추가하는 함수
// function getListItem(index, auctionMaster) {
//     var el = document.createElement('li');

//     var auctionKey = auctionMaster.auctionKey;
//     var roadName = auctionMaster.roadName;
//     var predictionPrice = auctionMaster.predictionPrice;

//     var itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
//         '<div class="info">' +
//         '   <h5>' + auctionKey + '</h5>';

//     if (roadName) {
//         itemStr += '    <span>' + roadName + '</span>' +
//             '   <span class="jibun gray">' + auctionMaster.address + '</span>';
//     } else {
//         itemStr += '    <span>' + auctionMaster.address + '</span>';
//     }

//     itemStr += '  <span class="tel">' + predictionPrice + '</span>' +
//         '</div>';

//     el.innerHTML = itemStr;
//     el.className = 'item';

//     return el;
// }

// // 검색결과 목록의 자식 Element를 제거하는 함수입니다
// function removeAllChildNodes(el) {
//     while (el.hasChildNodes()) {
//         el.removeChild(el.lastChild);
//     }
// }

// // 페이지번호를 관리할 변수
// var currentPage = 1;

// // 페이지가 바뀔 때 호출되는 함수
// function onPageChange(page) {
//     currentPage = page;
//     updateMarkers(); // 페이지가 변경될 때 마커 업데이트
//     updateList(page); // 페이지가 변경될 때 목록 업데이트
// }

// // 마커 업데이트 함수
// function updateMarkers() {
//     // 이전 마커 모두 제거
//     removeMarker();
//     // 현재 페이지에 해당하는 아이템들로 마커를 생성하고 지도에 추가
//     var startIndex = (currentPage - 1) * itemsPerPage;
//     var endIndex = startIndex + itemsPerPage;

//     for (var i = startIndex; i < endIndex && i < auctionMasters.length; i++) {
//         geocoder.addressSearch(auctionMasters[i].address, createMarkerCallback(i));
//     }
// }
// function updateList(page) {
//     var startIndex = (page - 1) * itemsPerPage;
//     var endIndex = startIndex + itemsPerPage;
//     removeAllChildNodes(listEl);

//     for (var i = startIndex; i < endIndex; i++) {
//         if (i < auctionMasters.length) {
//             var itemEl = getListItem(i, auctionMasters[i]);
//             listEl.appendChild(itemEl);
//         }
//     }
// }


// // 페이지 번호를 표시하고 페이지 이동을 처리
// function displayPagination() {
//     var paginationEl = document.getElementById('pagination');
//     var fragment = document.createDocumentFragment();
//     var totalPages = Math.ceil(auctionMasters.length / itemsPerPage);

//     for (var i = 1; i <= totalPages; i++) {
//         var el = document.createElement('a');
//         el.href = "#";
//         el.innerHTML = i;

//         if (i === 1) {
//             el.className = 'on';
//         }

//         el.addEventListener('click', function (event) {
//             var page = parseInt(event.target.innerHTML);
//             onPageChange(page); // 페이지 번호가 클릭되면 onPageChange 호출
//         });

//         fragment.appendChild(el);
//     }
//     paginationEl.appendChild(fragment);
// }

// // 초기 페이지 목록 업데이트
// updateList(1);
// displayPagination();




