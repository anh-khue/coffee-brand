import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import geolib from 'geolib';

import map_marker_icon from './images/map-marker-red.png';
import current_location_icon from './images/current-location.png';

const DEFAULT_LATITUDE = 10.854130;
const DEFAULT_LONGITUDE = 106.628859;
const DEFAULT_LATITUDE_LONGITUDE_DELTA = 0.01;

const GOOGLE_MAPS_APIKEY = 'AIzaSyD7wXi2cuD6R3PBTuSOVSnNJ3BIU6dPFwQ';

const BRANCH_ADDRESSES_API_URL = 'http://192.168.100.39:9999/cobra-branch-service/branches';

import Branch from './Branch';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      branches: [
        {
          latitude: DEFAULT_LATITUDE,
          longitude: DEFAULT_LONGITUDE
        },
        {
          latitude: DEFAULT_LATITUDE,
          longitude: DEFAULT_LONGITUDE
        },
        {
          latitude: DEFAULT_LATITUDE,
          longitude: DEFAULT_LONGITUDE
        }
      ],
      marker: {
        latitude: DEFAULT_LATITUDE,
        longitude: DEFAULT_LONGITUDE,
        latitudeDelta: DEFAULT_LATITUDE_LONGITUDE_DELTA,
        longitudeDelta: DEFAULT_LATITUDE_LONGITUDE_DELTA
      },
      goToBranch: false
    }
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        marker: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }
      })
    })

    let originalPosition = {
      latitude: this.state.marker.latitude,
      longitude: this.state.marker.longitude
    }

    fetch(BRANCH_ADDRESSES_API_URL)
      .then((response) => response.json()).then((responseJson) => {
        responseJson = responseJson.map(branch => {
          branch.distance = geolib.getDistance(originalPosition, { latitude: branch.latitude, longitude: branch.longitude }, 1, 1);
          return branch
        })
        responseJson = responseJson.sort((a, b) => {
          if (a.distance < b.distance) return -1
          else if (a.distance > b.distance) return 1
          else return 0
        })
        this.setState({
          branches: responseJson
        })
      })
  }

  render() {

    if (!this.state.goToBranch) {

      return (
        <View style={{ flex: 1 }}>

          <MapView style={{ flex: 1 }} region={this.state.marker}>

            <MapView.Marker coordinate={this.state.marker}>
              <View><Image source={current_location_icon} style={{ width: 30, height: 30 }} /></View>
            </MapView.Marker>

            <MapView.Marker coordinate={this.state.branches[0]} onPress={() => this.setState({ goToBranch: true, selectedBranchId: this.state.branches[0].id })} >
              <View><Image source={map_marker_icon} style={{ width: 60, height: 60 }} /></View>
            </MapView.Marker>

            <MapView.Marker coordinate={this.state.branches[1]} onPress={() => this.setState({ goToBranch: true, selectedBranchId: this.state.branches[1].id })} >
              <View><Image source={map_marker_icon} style={{ width: 60, height: 60 }} /></View>
            </MapView.Marker>

            <MapView.Marker coordinate={this.state.branches[2]} onPress={() => this.setState({ goToBranch: true, selectedBranchId: this.state.branches[2].id })} >
              <View><Image source={map_marker_icon} style={{ width: 60, height: 60 }} /></View>
            </MapView.Marker>

            <MapViewDirections
              origin={this.state.marker}
              destination={this.state.branches[0]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#f13900"
            />

            <MapViewDirections
              origin={this.state.marker}
              destination={this.state.branches[1]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#f13900"
            />

            <MapViewDirections
              origin={this.state.marker}
              destination={this.state.branches[2]}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={5}
              strokeColor="#f13900"
            />

          </MapView>

        </View>
      );

    } else {
      return (
        <Branch branchId={this.state.selectedBranchId} />
      )
    }
  }
}
