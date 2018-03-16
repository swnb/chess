import React from 'react';
import canvasCreate from './canvas'

class Info extends React.Component {
    constructor(props) {
        super(props);

        this.info = props.info
        this.state = {
            rotate: 0,
            infoArr: [this.info],
        }

        this.face = 0

        this.grow = () => {
            const old = this.face
            if (this.face >= 3) {
                this.face = 0
            } else {
                this.face += 1
            }
            return [old, this.face]
        }

        this.time = '0.5s';

        this.width = props.width;
        this.height = props.height;


        this.style = {
            position: 'absolute',
            width: this.width,
            height: this.height,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transformOrigin: '50%',
            backfaceVisibility: 'hidden'
        }

        this.front = {
            transform: `translateZ(${parseInt(this.height, 10) / 2}px) `,
        }
        this.top = {
            transform: `rotateX(-90deg) translateZ(${parseInt(this.height, 10) / 2}px) `,
        }
        this.back = {
            transform: `rotateX(180deg) translateZ(${parseInt(this.height, 10) / 2}px) `,
        }
        this.bottom = {
            transform: `rotateX(90deg) translateZ(${parseInt(this.height, 10) / 2}px) `,
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.info === this.info) {
            return;
        }
        const [oldFace, newFace] = this.grow()
        this.setState(preState => {
            let infoArr = [...preState.infoArr]
            infoArr[oldFace] = this.info;
            infoArr[newFace] = nextProps.info
            this.info = nextProps.info
            return { infoArr }
        }, () => {
            this.setState(preState => {
                return { rotate: preState.rotate + 90 }
            })
        })
    }
    assign(...objs) {
        let objC = {}
        objs.forEach(obj => {
            for (let x in obj) {
                objC[x] = obj[x]
            }
        })
        return objC
    }
    canvasInit() {
        canvasCreate(parseInt(this.width, 10), parseInt(this.height, 10))
    }
    componentDidMount() {
        this.canvasInit()
    }
    render() {
        return <div style={{
            position: 'relative',
            margin: '3% auto',
            width: this.width,
            height: this.height,
            transition: `all ${this.time} ease-in-out`,
            transform: `rotateX(${this.state.rotate}deg)`,
            transformStyle: 'preserve-3d'
        }}>
            <div style={this.assign(this.style, this.front)}>
                <canvas>
                </canvas>
                <div style={{
                    position: 'absolute',
                    margin: 'auto',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>{this.state.infoArr[0]}</div>
            </div>
            <div style={this.assign(this.style, this.top)}>
                <canvas>
                </canvas>
                <div style={{
                    position: 'absolute',
                    margin: 'auto',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>{this.state.infoArr[1]}</div>
            </div >
            <div style={this.assign(this.style, this.back)}>
                <canvas>
                </canvas>
                <div style={{
                    position: 'absolute',
                    margin: 'auto',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>{this.state.infoArr[2]}</div>
            </div >
            <div style={this.assign(this.style, this.bottom)}>
                <canvas>
                </canvas>
                <div style={{
                    position: 'absolute',
                    margin: 'auto',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>{this.state.infoArr[3]}</div>
            </div>
        </div>
    }
}

export default Info;
