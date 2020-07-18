      var map;

      function initMap(pos = {lat: 41.345801, lng: 21.568968}) {

          map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 25
          });

          map.setTilt(0);
          map.setMapTypeId('satellite');
        var drawingManager = new google.maps.drawing.DrawingManager({
           // drawingMode: google.maps.drawing.OverlayType.POLYGON,
           drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: ['polygon']
            },
        });

        drawingManager.setMap(map);

        google.maps.event.addListener(drawingManager, 'polygoncomplete', function(event) {


          var area = google.maps.geometry.spherical.computeArea(event.getPath().i);
          $('#result').html('The surface area selected is: <div class="btn btn-primary">'+Math.round(area)+"m<sup>2</sup></div> " );



        });
      }


      function getCoordinates(address){
          $.ajax({
            url: '/coordinates?address='+address,

            success: (coordinatesData) => {
              console.log(coordinatesData);
              initMap(coordinatesData);
            },

            error: (coordinatesError) => {
              console.log(coordinatesError);
            }
          });
      }

      $('#address-form').submit(function(){
        var address = $('#address-input').val();

        initMap(  getCoordinates(address) );
      });
