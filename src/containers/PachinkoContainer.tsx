import Header from "../components/header.tsx";
import { useBalanceStore } from '../store/store.ts';
import { Engine, Render, Bodies, Composite, Runner, Events } from 'matter-js'
import { useEffect, useRef, useState } from 'react'
import '../styles/_casino.css';
import ping from '../assets/Music/button-124476.mp3';
import winSound from '../assets/Music/power-up-sparkle-1-177983.mp3';
import loseSound from '../assets/Music/tennis-smash-100733.mp3';
import neutralSound from '../assets/Music/90s-game-ui-6-185099.mp3';

const PARTICLE_SIZE = 6;
const PARTICLE_BOUNCYNESS = 0.9;

const barriers_x = [50,100,150,200,275,325,400,450,500,550];

const Pachinko = () => {
    const addMoney = useBalanceStore((state) => state.addMoney);
    const loseMoney = useBalanceStore((state) => state.loseMoney);
    const balance = useBalanceStore((state) => state.balance);

    const [someStateValue, setSomeStateValue] = useState(false);
    const [scene, setScene] = useState();
    
    const boxRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    var pingSoundPlayer = new Audio(ping);
    var loseSoundPlayer = new Audio(loseSound);
    var winSoundPlayer = new Audio(winSound);
    var neutralSoundPlayer = new Audio(neutralSound);

    const handleClick = () => {
      setSomeStateValue(!someStateValue);
      loseMoney(50);
    };

    useEffect(() => {
        let engine = Engine.create({});
    
        let render = Render.create({
            element: boxRef.current,
            engine: engine,
            canvas: canvasRef.current,
            options: {
                width: 600,
                height: 700,
                background: 'rgba(215, 254, 255, 0.851)',
                wireframes: false,
            },
      });

      const walls = [
        Bodies.rectangle(300, 700, 600, 20, {
          isStatic: true,
          render: {
            fillStyle: 'blue',
          },
        }),
        Bodies.rectangle(0, 350, 10, 700, {
          isStatic: true,
          render: {
            fillStyle: 'blue',
          },
        }),
        Bodies.rectangle(600, 350, 10, 700, {
          isStatic: true,
          render: {
            fillStyle: 'blue',
          },
        }),
      ];

      var x = 0, xStart = 50;
      var y = 25;
      var step = 50;
      var count = 0;

      while (y < 600) {
        console.log(count)
        if (count % 2 != 0) {
          xStart = 30
        }
        else {
          xStart = 60;
        }
        x = xStart;
        while (x < 570) {
          Composite.add(
            engine.world,
            Bodies.circle(x, y, 10, {
              isStatic: true,
              render: { fillStyle: 'blue' }
            }));
            x += step;
        }
        count++;
        y += step;
      }

      let barriers = [];
      for (var i = 0; i < barriers_x.length; i++){
          barriers.push(
            Bodies.rectangle(barriers_x[i], 660, 10, 75, {
              isStatic: true,
              render: {
                fillStyle: 'blue',
              }
            }
          ));
      }

      let lose_buckets = [
        Bodies.rectangle(25, 670, 40, 40, {label:"lose", isStatic:true, render:{fillStyle:'#ff5c5c'}}),
        Bodies.rectangle(237, 670, 60, 40, {label:"lose", isStatic:true, render:{fillStyle:'#ff5c5c'}}),
        Bodies.rectangle(362, 670, 60, 40, {label:"lose", isStatic:true, render:{fillStyle:'#ff5c5c'}}),
        Bodies.rectangle(575, 670, 40, 40, {label:"lose", isStatic:true, render:{fillStyle:'#ff5c5c'}})
      ];

      let x1_buckets = [
        Bodies.rectangle(75, 670, 40, 40, {label:"x1", isStatic:true, render:{fillStyle:'#8f9695'}}),
        Bodies.rectangle(175, 670, 40, 40, {label:"x1", isStatic:true, render:{fillStyle:'#8f9695'}}),
        Bodies.rectangle(425, 670, 40, 40, {label:"x1", isStatic:true, render:{fillStyle:'#8f9695'}}),
        Bodies.rectangle(525, 670, 40, 40, {label:"x1", isStatic:true, render:{fillStyle:'#8f9695'}})
      ];

      let x2_buckets = [
        Bodies.rectangle(125, 670, 40, 40, {label:"x2", isStatic:true, render:{fillStyle:'#68e3ae'}}),
        Bodies.rectangle(475, 670, 40, 40, {label:"x2", isStatic:true, render:{fillStyle:'#68e3ae'}})
      ];

      let jackpot_buckets = Bodies.rectangle(300, 670, 40, 40, {label:"jackpot", isStatic:true, render:{fillStyle:'#ffdb38'}});

      Composite.add(engine.world, walls);
      Composite.add(engine.world, barriers);
      Composite.add(engine.world, lose_buckets);
      Composite.add(engine.world, x1_buckets);
      Composite.add(engine.world, x2_buckets);
      Composite.add(engine.world, [jackpot_buckets]);

      Runner.run(engine);
      Render.run(render);
      
      setScene(render);

      Events.on(engine, 'collisionStart', event => {
        for (const {bodyA, bodyB} of event.pairs) {
          if(bodyA.label == "ball"){
            if(bodyB.label == "x1"){
              addMoney(50);
              Composite.remove(engine.world, bodyA);
              neutralSoundPlayer.play();
              neutralSoundPlayer.currentTime = 0;
            }
            else if(bodyB.label == "x2"){
              addMoney(100);
              Composite.remove(engine.world, bodyA);
              neutralSoundPlayer.play();
              neutralSoundPlayer.currentTime = 0;
            }
            else if(bodyB.label == "jackpot"){
              addMoney(500);
              Composite.remove(engine.world, bodyA);
              winSoundPlayer.play();
              winSoundPlayer.currentTime = 0;
            }
            else if(bodyB.label == "lose"){
              Composite.remove(engine.world, bodyA);
              loseSoundPlayer.play();
              loseSoundPlayer.currentTime = 0;
            }
            else{
              pingSoundPlayer.play();
              pingSoundPlayer.currentTime = 0;
            }
          }
          else if(bodyB.label == "ball"){
            if(bodyA.label == "x1"){
              addMoney(50);
              Composite.remove(engine.world, bodyB);
              neutralSoundPlayer.play();
              neutralSoundPlayer.currentTime = 0;
            }
            else if(bodyA.label == "x2"){
              addMoney(100);
              Composite.remove(engine.world, bodyB);
              neutralSoundPlayer.play();
              neutralSoundPlayer.currentTime = 0;
            }
            else if(bodyA.label == "jackpot"){
              addMoney(500);
              Composite.remove(engine.world, bodyB);
              winSoundPlayer.play();
              winSoundPlayer.currentTime = 0;
            }else if(bodyA.label == "lose"){
              Composite.remove(engine.world, bodyB);
              loseSoundPlayer.play();
              loseSoundPlayer.currentTime = 0;
            }
            else{
              pingSoundPlayer.play();
              pingSoundPlayer.currentTime = 0;
            }
          }
        }
      })
    }, []);

    useEffect(() => {
      // Add a new "ball" everytime `someStateValue` changes
      if (scene) {
        let width = 600;
        let randomX = Math.floor(Math.random() * -width) + width;
        Composite.add(
          scene.engine.world,
          Bodies.circle(randomX, -PARTICLE_SIZE, PARTICLE_SIZE, {
            density:.04,
            friction: .01,
            restitution: PARTICLE_BOUNCYNESS, render: {fillStyle: 'red'}, label: "ball"
          })
        );
      }
    }, [someStateValue]);

    return (
        <>
            <Header balance={balance}/>
            <div
                ref={boxRef}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                >
                <canvas ref={canvasRef} />
            </div>
            <button id="drop-ball" onClick={handleClick}>Drop Ball</button>
        </>
    );
};

export default Pachinko;
