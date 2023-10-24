
var addresses = addressesData;
var mapContainer = document.getElementById('map'); // 지도를 표시할 div 
var mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
    level: 3 // 지도의 확대 레벨
};

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption);

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();


// 각 주소에 대해 좌표 변환 후, 지도에 마커를 추가합니다
for (var i = 0; i < addresses.length; i++) {
    geocoder.addressSearch(addresses[i], function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 지도의 중심을 마지막 주소의 좌표로 이동시킵니다
            if (i === addresses.length - 1) {
                map.setCenter(coords);
            }
        }
    });
}
