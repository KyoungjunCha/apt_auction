// 동일역할하는 함수가 꽤많음 줄이고 맵 호출함수도 하나로 통일하고 함수 흐름을 하나로 바꾸면 깔끔해 질것
// 23.10.15 해당 리팩토링 결과 함수기능이 제대로 이루어 지지 않는 부분이 많음. 대기




var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);

// 마커를 담을 배열입니다
var markers = [];
// var addresses = /*[[${addresses}]]*/;



// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });







// 23.10.19 키워드 장소 검색 부분 수정 요망
// 장소검색과 해당 부분을 매핑하는 기능을 현재 가지고 있음.
// 결과적으로 중단부 

// author: 차경준
//             date: 23.10.19
//             decription : 주소 맵핑
//             작업중
// 주소검색
// 서버에서 AuctionMaster 정보를 가져오는 함수

// 부분을 병합하여함
// displayPlaces 함수부분은 마커와 내용을 맵에 list에 기입하는 부분
// getListItem 함수와 displayPagination 함수의 수정이 필요합니다.
// 키워드로 장소를 검색합니다
searchPlaces();


// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) { //앞뒤 공백 제거인듯?
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);


}


// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === kakao.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}



// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (var i = 0; i < places.length; i++) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);

        var marker = addMarker(placePosition, i),
            itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function (marker, title) {
            kakao.maps.event.addListener(marker, 'mouseover', function () {
                displayInfowindow(marker, title);
            });

            kakao.maps.event.addListener(marker, 'mouseout', function () {
                infowindow.close();
            });

            itemEl.onmouseover = function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout = function () {
                infowindow.close();
            };
        })(marker, places[i].place_name);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {

    var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
            '<div class="info">' +
            '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
            '   <span class="jibun gray">' + places.address_name + '</span>';
    } else {
        itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone + '</span>' +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(),
        i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i === pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function (i) {
                return function () {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

// 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

















// 여기부터는 태그 필터 즉 은행 마트 약국 주유소 카페 학교 입니다.

// // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
    contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
    categorymarkers = [], // 마커를 담을 배열입니다
    currCategory = ''; // 현재 선택된 카테고리를 가지고 있을 변수입니다

// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places(map);

// 지도에 idle 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'idle', searchPlacesCategory); //지도가 멈춰있을때만 이벤트 발생 idle

// 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
contentNode.className = 'placeinfo_wrap';

// 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
// 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

// 커스텀 오버레이 컨텐츠를 설정합니다
placeOverlay.setContent(contentNode);

// 각 카테고리에 클릭 이벤트를 등록합니다
addCategoryClickEvent();

// 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
function addEventHandle(target, type, callback) {
    if (target.addEventListener) {
        target.addEventListener(type, callback);
    } else {
        target.attachEvent('on' + type, callback);
    }
}

// 카테고리 검색을 요청하는 함수입니다
function searchPlacesCategory() {
    if (!currCategory) {
        return;
    }

    // 커스텀 오버레이를 숨깁니다
    placeOverlay.setMap(null);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarkerCategory();

    ps.categorySearch(currCategory, placesSearchCBCategory, { useMapBounds: true });
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCBCategory(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        displayPlacesCategory(data);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요

    } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요

    }
}

// 지도에 마커를 표출하는 함수입니다
function displayPlacesCategory(places) {

    // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
    // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
    var order = document.getElementById(currCategory).getAttribute('data-order');



    for (var i = 0; i < places.length; i++) {

        // 마커를 생성하고 지도에 표시합니다
        var categorymarker = addMarkerCategory(new kakao.maps.LatLng(places[i].y, places[i].x), order);

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        (function (categorymarker, place) {
            kakao.maps.event.addListener(categorymarker, 'click', function () {
                displayPlaceInfo(place);
            });
        })(categorymarker, places[i]);
    }
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarkerCategory(position, order) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28),  // 마커 이미지의 크기
        imgOptions = {
            spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(46, (order * 36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        categorymarker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

    categorymarker.setMap(map); // 지도 위에 마커를 표출합니다
    categorymarkers.push(categorymarker);  // 배열에 생성된 마커를 추가합니다

    return categorymarker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarkerCategory() {
    for (var i = 0; i < categorymarkers.length; i++) {
        categorymarkers[i].setMap(null);
    }
    categorymarkers = [];
}

// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
function displayPlaceInfo(place) {
    var content = '<div class="placeinfo">' +
        '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';

    if (place.road_address_name) {
        content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
            '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
    } else {
        content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
    }

    content += '    <span class="tel">' + place.phone + '</span>' +
        '</div>' +
        '<div class="after"></div>';

    contentNode.innerHTML = content;
    placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
    placeOverlay.setMap(map);
}


// 각 카테고리에 클릭 이벤트를 등록합니다
function addCategoryClickEvent() {
    var category = document.getElementById('category'),
        children = category.children;

    for (var i = 0; i < children.length; i++) {
        children[i].onclick = onClickCategory;
    }
}

// 카테고리를 클릭했을 때 호출되는 함수입니다
function onClickCategory() {
    var id = this.id,
        className = this.className;

    placeOverlay.setMap(null);

    if (className === 'on') {
        currCategory = '';
        changeCategoryClass();
        removeMarkerCategory();
    } else {
        currCategory = id;
        changeCategoryClass(this);
        searchPlacesCategory();
    }
}

// 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
function changeCategoryClass(el) {
    var category = document.getElementById('category'),
        children = category.children,
        i;

    for (i = 0; i < children.length; i++) {
        children[i].className = '';
    }

    if (el) {
        el.className = 'on';
    }
}





















//여기부터는 db에 읽어온 주소를 출력하는 구간입니다.


var addresses = addressesData;
var auctionMaster = auctionMasters;


// 주소좌표 변환 객체를 생성
var geocoder = new kakao.maps.services.Geocoder();


// // 각 주소에 대해 좌표 변환 후, 지도에 마커를 추가
// for (var i = 0; i < addresses.length; i++) {
//     geocoder.addressSearch(addresses[i], function (result, status) {
//         if (status === kakao.maps.services.Status.OK) {
//             var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

//             // 결과값으로 받은 위치를 마커로 표시
//             var marker = new kakao.maps.Marker({
//                 map: map,
//                 position: coords
//             });
//             marker.setMap(map); // 지도 위에 마커를 표출
//             markers.push(marker);  // 배열에 생성된 마커를 추가
//             // 지도의 중심을 마지막 주소의 좌표로 이동
//             if (i === addresses.length - 1) {
//                 map.setCenter(coords);
//             }
//         }
//     });
// }
for (var i = 0; i < addresses.length; i++) {
    geocoder.addressSearch(addresses[i], createMarkerCallback(i));
}

function createMarkerCallback(idx) {
    return function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            var marker = addMarker(coords, idx);
            markers.push(marker);

            if (idx === addresses.length - 1) {
                map.setCenter(coords);
            }
        }
    };
}

function addMarker(position, idx) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
    var imageSize = new kakao.maps.Size(36, 37);
    var imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691),
        spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10),
        offset: new kakao.maps.Point(13, 37)
    };
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
    var marker = new kakao.maps.Marker({
        position: position,
        image: markerImage,
        map: map
    });

    return marker;
}


var listEl = document.getElementById('placesList');
var fragment = document.createDocumentFragment();

for (var i = 0; i < addressesData.length; i++) {
    var itemEl = getListItem(i, addressesData[i]);
    fragment.appendChild(itemEl);
}

listEl.innerHTML = ''; // 기존 목록을 비워서 초기화
listEl.appendChild(fragment); // 새로운 목록으로 대체


// auctionKey
// addressSido
// address 잘라써야함
// real_price


// // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
// function addMarker(position, idx, title) {
//     var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
//         imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
//         imgOptions = {
//             spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
//             spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
//             offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
//         },
//         markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
//         marker = new kakao.maps.Marker({
//             position: position, // 마커의 위치
//             image: markerImage
//         });

//     marker.setMap(map); // 지도 위에 마커를 표출합니다
//     markers.push(marker);  // 배열에 생성된 마커를 추가합니다

//     return marker;
// }





// 23.10.19 키워드 장소 검색 부분 수정 요망
// 장소검색과 해당 부분을 매핑하는 기능을 현재 가지고 있음.
// 결과적으로 중단부 

// author: 차경준
//             date: 23.10.19
//             decription : 주소 맵핑
//             작업중
// 주소검색
// 서버에서 AuctionMaster 정보를 가져오는 함수

// 부분을 병합하여함
// displayPlaces 함수부분은 마커와 내용을 맵에 list에 기입하는 부분
// getListItem 함수와 displayPagination 함수의 수정이 필요합니다.


// // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
// function placesSearchCB(data, status, pagination) {
//     if (status === kakao.maps.services.Status.OK) {

//         // 정상적으로 검색이 완료됐으면
//         // 검색 목록과 마커를 표출합니다
//         displayPlaces(data);

//         // 페이지 번호를 표출합니다
//         displayPagination(pagination);

//     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

//         alert('검색 결과가 존재하지 않습니다.');
//         return;

//     } else if (status === kakao.maps.services.Status.ERROR) {

//         alert('검색 결과 중 오류가 발생했습니다.');
//         return;

//     }
// }








// // 검색 결과 목록과 마커를 표출하는 함수입니다
// function displayPlaces(places) {

//     var listEl = document.getElementById('placesList'),
//         menuEl = document.getElementById('menu_wrap'),
//         fragment = document.createDocumentFragment(),
//         bounds = new kakao.maps.LatLngBounds(),
//         listStr = '';

//     // 검색 결과 목록에 추가된 항목들을 제거합니다
//     removeAllChildNods(listEl);

//     // 지도에 표시되고 있는 마커를 제거합니다
//     removeMarker();

//     for (var i = 0; i < places.length; i++) {

//         // 마커를 생성하고 지도에 표시합니다
//         var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);

//         var marker = addMarker(placePosition, i),
//             itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

//         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
//         // LatLngBounds 객체에 좌표를 추가합니다
//         bounds.extend(placePosition);

//         // 마커와 검색결과 항목에 mouseover 했을때
//         // 해당 장소에 인포윈도우에 장소명을 표시합니다
//         // mouseout 했을 때는 인포윈도우를 닫습니다
//         (function (marker, title) {
//             kakao.maps.event.addListener(marker, 'mouseover', function () {
//                 displayInfowindow(marker, title);
//             });

//             kakao.maps.event.addListener(marker, 'mouseout', function () {
//                 infowindow.close();
//             });

//             itemEl.onmouseover = function () {
//                 displayInfowindow(marker, title);
//             };

//             itemEl.onmouseout = function () {
//                 infowindow.close();
//             };
//         })(marker, places[i].place_name);

//         fragment.appendChild(itemEl);
//     }

//     // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
//     listEl.appendChild(fragment);
//     menuEl.scrollTop = 0;

//     // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
//     map.setBounds(bounds);
// }





// // 검색결과 항목을 Element로 반환하는 함수입니다
// function getListItem(index, places) {

//     var el = document.createElement('li'),
//         itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
//             '<div class="info">' +
//             '   <h5>' + places.place_name + '</h5>';

//     if (places.road_address_name) {
//         itemStr += '    <span>' + places.road_address_name + '</span>' +
//             '   <span class="jibun gray">' + places.address_name + '</span>';
//     } else {
//         itemStr += '    <span>' + places.address_name + '</span>';
//     }

//     itemStr += '  <span class="tel">' + places.phone + '</span>' +
//         '</div>';

//     el.innerHTML = itemStr;
//     el.className = 'item';

//     return el;
// }






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