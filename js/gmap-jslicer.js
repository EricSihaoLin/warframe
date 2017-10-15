/**
 * GMap-JSlicer v0.1
 * Author: Matt Urtnowski
 * GitHub: https://github.com/Murtnowski/GMap-JSlicer
 *
 * Not Production Ready
 * For use as code sample only
 *
 * Sorry, using it for production :(  - Eric
 **/
 
function JSlicer(target, src) {
    this.img;
    this.target = target;
    this.src = src;
    this.centreLat = 0.0;
    this.centreLon = 0.0;
    this.initialZoom = 2;
    this.imageWraps = false;
    this.map;
    this.gmicMapType;
}

function GMICMapType(img) {
    this.sourceImg = img;
    this.Cache = Array();
    this.opacity = 1.0;
}

// Adds predefined markers to the map
function addMarkers(map) {
	
	var homeIcon = {
		url: "img/map_icons/home.png",
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0,0)
	};
	
	var home = [
		['Cetus', -61.270232790000605, 7.3828125, 'Travel gate back to town'],
	];
	
	var fishIcon = {
		url: "img/map_icons/fish.png",
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0,0)
	};
	
	var fish = [
		['Fishing', -60.06484046010449, 66.4453125, 'Mort Fish<br>Khut Khut'],
		['Fishing', -56.36525013685607, -33.046875, 'Mort Fish<br>Khut Khut<br>Yogwun Fish<br>Maw Fish'],
		['Fishing', 60.413852350464914, 12.3046875, 'Khut Khut<br>Yogwun Fish'],
		['Fishing', -10.83330598364249, 19.6875, 'Charc Eel<br>Mort Fish<br>Khut Khut'],
		['Fishing', -46.316584181822186, -158.90625, 'Goopolla<br>Tarrok<br>Sharrat (Night)'],
		['Fishing', -61.77312286453145, -162.0703125, 'Goopolla<br>Tarrok<br>Sharrat (Night)<br>Karkina Crabs'],
		['Fishing', -76.18499546094715, -126.5625, 'Goopolla'],
		['Fishing', 37.16031654673677, -69.2578125, 'Khut Khut<br>Yogwun Fish'],
		['Fishing', 83.0687741347372, -132.5390625, 'Khut Khut<br>Yogwun Fish'],
	];
	
	var caveIcon = {
		url: "img/map_icons/caves.png",
		origin: new google.maps.Point(0,0),
		anchor: new google.maps.Point(0,0)
	};
	
	var cave = [
		['Cave', -58.07787626787517, -43.2421875, ''],
		['Cave', -70.49557354093136, -59.0625, ''],
		['Cave', -44.08758502824516, -95.625, ''],
		['Cave', -54.162433968067795, -148.7109375, ''],
		['Cave', 21.94304553343818, -145.546875, ''],
		['Cave', 79.81230226556366, -85.078125, ''],
		['Cave', 70.37785394109224, 98.0859375, ''],
		['Cave', 53.748710796898976, 126.5625, ''],
		['Cave', 22.917922936146045, 138.1640625, ''],
		['Cave', 16.97274101999902, 94.921875, ''],
		['Cave', -75.40885422846453, 92.109375, ''],
		['Cave', -80.8168908864086, 148.7109375, ''],
	];
	
	var infowindow = new google.maps.InfoWindow();
	
	// Home icon loop
	for (var i = 0; i < home.length; i++){
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(home[i][1], home[i][2]),
			map: map,
			icon: homeIcon,
			title: home[i][0],
			optimized: false
		});
		
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent("<strong>" + home[i][0] + "</strong><br><br>" + home[i][3]);
                infowindow.open(map, marker);
            }
        })(marker, i)); 
	}
	
	// Fish icon loop
	for (var i = 0; i < fish.length; i++){
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(fish[i][1], fish[i][2]),
			map: map,
			icon: fishIcon,
			title: fish[i][0],
			optimized: false
		});
		
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent("<strong>" + fish[i][0] + "</strong><br><br>" + fish[i][3]);
                infowindow.open(map, marker);
            }
        })(marker, i)); 
	}
	
	// Cave icon loop
	for (var i = 0; i < cave.length; i++){
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(cave[i][1], cave[i][2]),
			map: map,
			icon: caveIcon,
			title: cave[i][0],
			optimized: false
		});
		
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent("<strong>" + cave[i][0] + "</strong>" + cave[i][3]);
                infowindow.open(map, marker);
            }
        })(marker, i)); 
	}
}
    
(function() {        
    JSlicer.prototype.init = function init() {
        var that = this;
        
        var downloadAsset = function(src, callback) {
            if(!this.img) {
                var img = document.createElement('img');
                
                img.onerror = function() {
                    console.log(src + ' failed to load');
                    if(callback) {
                        callback(false);
                    }
                };

                img.onload = function() {
                    var canvas = document.createElement('canvas'); 
                    var dimension = Math.max(img.width, img.height);
                    canvas.width = dimension;
                    canvas.height = dimension;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(img, (dimension - img.width) / 2, (dimension - img.height) / 2);
                    
                    
                    img.onload = function() {
                        img.removeEventListener('onload', arguments.callee, false);
                        that.img = img;
                        if(callback) {
                            callback(img);
                        }
                    };
                    
                    img.src = canvas.toDataURL();
                };
                
                img.src = src;
            } else {
                if(callback) {
                    callback(this.img);
                }
            }
        };
        
        var load =  function() {
            that.resizeMapDiv();
            var latlng = new google.maps.LatLng(that.centreLat, that.centreLon);
            var myOptions = {
                zoom: that.initialZoom,
                minZoom: 2,
                maxZoom: 3,
                center: latlng,
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: false,
                streetViewControl: false,
                overviewMapControl: true,
                mapTypeControlOptions: { 
                    mapTypeIds: ["GameMap"],
                    position: google.maps.ControlPosition.TOP_RIGHT,
                    style: google.maps.MapTypeControlStyle.DEFAULT
                },
				mapTypeId: "GameMap",
            }
            
            map = new google.maps.Map(that.target, myOptions);
			
			// This event listener when the map is clicked.
			google.maps.event.addListener(map, 'click', function(event) {
				console.log(JSON.stringify(event.latLng));
			});
			
			addMarkers(map);
			
			if(!that.imageWraps) {
                that.setBounds();
            }

            gmicMapType = new GMICMapType(that.img);
            map.mapTypes.set("GameMap",gmicMapType);
        };

        downloadAsset(this.src, function() {
            load();
        });
    };
    
    JSlicer.prototype.resizeMapDiv = function resizeMapDiv() {
        var d = this.target;

        var offsetTop = 0;
        for (var elem = d; elem != null; elem = elem.offsetParent) {
            offsetTop += elem.offsetTop;

        }
        
        var height = getWindowHeight() - offsetTop - 16;

        if (height>=0) {
            d.style.height=height+"px";
        }
    };
    
    JSlicer.prototype.redraw = function redraw() {
        var zoom = map.getZoom();
        map.setZoom(0);
        setTimeout(function(){map.setZoom(zoom);}, 0);
    };

    GMICMapType.prototype.tileSize = new google.maps.Size(256, 256);
    GMICMapType.prototype.maxZoom = 3;
    GMICMapType.prototype.getTile = function(coord, zoom, ownerDocument) {
        var c = Math.pow(2, zoom);
        var tilex=coord.x,tiley=coord.y;
        if (this.imageWraps) {
            if (tilex<0) tilex=c+tilex%c;
            if (tilex>=c) tilex=tilex%c;
            if (tiley<0) tiley=c+tiley%c;
            if (tiley>=c) tiley=tiley%c;
        }
        else {
            if ((tilex<0)||(tilex>=c)||(tiley<0)||(tiley>=c))
            {
                var blank = ownerDocument.createElement('DIV');
                blank.style.width = this.tileSize.width + 'px';
                blank.style.height = this.tileSize.height + 'px';
                return blank;
            }
        }

        var img = ownerDocument.createElement('img');

        img.id = "t_" + zoom + "_" + tilex + "_" + tiley;
        img.style.width = this.tileSize.width + 'px';
        img.style.height = this.tileSize.height + 'px';

        var canvas = ownerDocument.createElement('canvas'); 
        canvas.width = this.tileSize.width;
        canvas.height = this.tileSize.height
        var ctx = canvas.getContext("2d");
        ctx.drawImage(this.sourceImg, this.sourceImg.width / Math.pow(2, zoom) * tilex, this.sourceImg.height / Math.pow(2, zoom) * tiley, this.sourceImg.width / Math.pow(2, zoom), this.sourceImg.height / Math.pow(2, zoom), 0, 0, this.tileSize.width, this.tileSize.height);
        img.src = canvas.toDataURL();

        this.Cache.push(img);

        return img;
    };
    
    GMICMapType.prototype.realeaseTile = function(tile) {
        var idx = this.Cache.indexOf(tile);
        if(idx!=-1) this.Cache.splice(idx, 1);
        tile=null;
    };
	
	JSlicer.prototype.setBounds = function setBounds() {
		var currentZoom = map.getZoom();
		var allowedBounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(-75.0, -60.0), 
				new google.maps.LatLng(75.0, 60.0)
			);
        
        var lastValidCenter = map.getCenter();
		var lastValidZoom = map.getZoom();
        
        google.maps.event.addListener(map, 'center_changed', function() {
			var currentZoom = map.getZoom();
			
            if (allowedBounds.contains(map.getCenter())) {
                lastValidCenter = map.getCenter();
                return; 
            }
            
            map.panTo(lastValidCenter);
        });
    };
    
    GMICMapType.prototype.name = "Plains of Eidolon";
    GMICMapType.prototype.alt = "Plains of Eidolon";
    GMICMapType.prototype.setOpacity = function(newOpacity) {
        this.opacity = newOpacity;
        for (var i = 0; i < this.Cache.length; i++) {
            this.Cache[i].style.opacity = newOpacity;
            this.Cache[i].style.filter = "alpha(opacity=" + newOpacity * 100 + ")"; //ie
        }
    };
    
    getWindowHeight = function() {
        if (window.self&&self.innerHeight) {
            return self.innerHeight;
        }
        if (document.documentElement&&document.documentElement.clientHeight) {
            return document.documentElement.clientHeight;
        }
        return 0;
    };
 })();