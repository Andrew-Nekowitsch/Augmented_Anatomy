'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
	ViroARScene,
	ViroText,
	ViroConstants,
	ViroBox,
	ViroMaterials,
	Viro3DObject,
	ViroAmbientLight,
	ViroSpotLight,
	ViroARPlaneSelector,
	ViroNode,
	ViroAnimations,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
	constructor() {
		super();

		// Set initial state here
		this.state = {
			text: 'Initializing AR...',
		};

		// bind 'this' to functions
		this._onInitialized = this._onInitialized.bind(this);
	}

	render() {
		return (
			<ViroARScene onTrackingUpdated={this._onInitialized}>
				<ViroNode position={[0, -1, 0]} dragType="FixedToWorld" onDrag={() => {}}></ViroNode>

				<ViroText
					text={this.state.text}
					scale={[0.5, 0.5, 0.5]}
					position={[0, 0, -1]}
					style={styles.helloWorldTextStyle}
				/>

				<ViroAmbientLight color={'#aaaaaa'} />
				<ViroSpotLight
					innerAngle={5}
					outerAngle={90}
					direction={[0, -1, -0.2]}
					position={[0, 3, 1]}
					color="#ffffff"
					castsShadow={true}
				/>

				<ViroNode position={[0, 0, -1]}>
					<Viro3DObject source={require('./res/heart.obj')} materials={['heart']} type="OBJ" />
				</ViroNode>

				<ViroText
					text="Heart"
					position={[0.0, 0.0, -3]}
					style={styles.textStyle}
					transformBehaviors={['billboardY']}
				/>
			</ViroARScene>
		);
	}

	_onInitialized(state, reason) {
		if (state == ViroConstants.TRACKING_NORMAL) {
			this.setState({
				text: 'Augmented Anatomy',
			});
		} else if (state == ViroConstants.TRACKING_NONE) {
			// Handle loss of tracking
		}
	}
}

var styles = StyleSheet.create({
	helloWorldTextStyle: {
		fontFamily: 'Arial',
		fontSize: 30,
		color: '#ffffff',
		textAlignVertical: 'center',
		textAlign: 'center',
	},
});

ViroMaterials.createMaterials({
	grid: {
		diffuseTexture: require('./res/grid_bg.jpg'),
	},
	heart: {
		lightingModel: 'Blinn',
		diffuseTexture: require('./res/Heart_D3.jpg'),
		specularTexture: require('./res/Heart_S2.jpg'),
		writesToDepthBuffer: true,
		readsFromDepthBuffer: true,
	},
});

ViroAnimations.registerAnimations({
	rotate: {
		properties: {
			rotateY: '+=45',
		},
		duration: 250, //.25 seconds
	},
});

module.exports = HelloWorldSceneAR;
