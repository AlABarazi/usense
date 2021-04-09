const concentration_space=  {

    "default": {
      "firstScene": "circle",
      "author": "BIM Aalt🎾",
      "sceneFadeDuration": 1000,
      "compass": true,
      "autoLoad":true
    },

    "scenes": {
      "circle": {
        "title": "Concetration Space",
        "hfov": 110,
        "pitch": -3,
        "yaw": 117,
        "type": "equirectangular",
        "panorama": "/martela.jpg",
        "hotSpots": [
          {
            "pitch": -2.1,
            "yaw": 132.9,
            "type": "scene",
            "text": "Spring House or Dairy",
            "sceneId": "house"
          }
        ]
      },

      "house": {
        "title": "Spring House or Dairy",
        "hfov": 110,
        "yaw": 5,
        "type": "equirectangular",
        "panorama": "https://pannellum.org/images/alma.jpg",
        "hotSpots": [
          {
            "pitch": -0.6,
            "yaw": 37.1,
            "type": "scene",
            "text": "Mason Circle",
            "sceneId": "circle",
            "targetYaw": -23,
            "targetPitch": 2
          }, {
            "pitch": 14.1,
            "yaw": 1.5,
            "type": "info",
            "text": "Smart Building Aalto",
            "URL": "https://artbma.org/"
          }, {
            "pitch": -9.4,
            "yaw": 222.6,
            "type": "info",
            "text": "Art Museum Drive"
          }, {
            "pitch": -0.9,
            "yaw": 144.4,
            "type": "info",
            "text": "North Charles Street"
          }

        ]

      }
    }

}

const chillout_space=  {

    "default": {
      "firstScene": "circle",
      "author": "Smart Floors Plans",
      "sceneFadeDuration": 1000,
      "compass": true,
      "autoLoad":true
    },

    "scenes": {
      "circle": {
        "title": "Ultra Hack",
        "hfov": 110,
        "pitch": -3,
        "yaw": 117,
        "type": "equirectangular",
        "panorama": "/martela.jpg",
        "hotSpots": [
          {
            "pitch": -2.1,
            "yaw": 132.9,
            "type": "scene",
            "text": "Spring House or Dairy",
            "sceneId": "house"
          }
        ]
      },

      "house": {
        "title": "Spring House or Dairy",
        "hfov": 110,
        "yaw": 5,
        "type": "equirectangular",
        "panorama": "https://pannellum.org/images/alma.jpg",
        "hotSpots": [
          {
            "pitch": -0.6,
            "yaw": 37.1,
            "type": "scene",
            "text": "Mason Circle",
            "sceneId": "circle",
            "targetYaw": -23,
            "targetPitch": 2
          }, {
            "pitch": 14.1,
            "yaw": 1.5,
            "type": "info",
            "text": "Smart Building Aalto",
            "URL": "https://artbma.org/"
          }, {
            "pitch": -9.4,
            "yaw": 222.6,
            "type": "info",
            "text": "Art Museum Drive"
          }, {
            "pitch": -0.9,
            "yaw": 144.4,
            "type": "info",
            "text": "North Charles Street"
          }

        ]

      }
    }

}
export {concentration_space,chillout_space}
