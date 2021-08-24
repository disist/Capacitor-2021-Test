import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { AdMob, RewardAdOptions, AdLoadInfo, RewardAdPluginEvents, AdMobRewardItem } from '@capacitor-community/admob';
import Phaser from 'phaser'

import './Home.css';

const Home: React.FC = () => {

  const initAdmob = () => {
    // AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
    //   // Subscribe prepared rewardVideo
    // });

    AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem: AdMobRewardItem) => {
      // Subscribe user rewarded
      console.log(rewardItem);
    });
  }

  const prepareAdmobVideo = () => {
    const options: RewardAdOptions = {
      adId: 'appId',
      isTesting: true
      // npa: true
      // ssv: {
      //   userId: "A user ID to send to your SSV"
      //   customData: JSON.stringify({ ...MyCustomData })
      //}
    };

    return AdMob.prepareRewardVideoAd(options);
  }

  initAdmob();
  prepareAdmobVideo();

  const showVideo = () => {
    AdMob.showRewardVideoAd()
      .then((rewardItem) => console.log('>> rewardItem', rewardItem))
      .then(() => prepareAdmobVideo());
  }

  const initPhaser = () => {
    const rootEl = document.getElementById('root');
    if (rootEl) {
      rootEl.hidden = true;
    }

    var config = {
      type: Phaser.WEBGL,
      width: "100%",
      height: "100%",
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 }
        }
      },
      scene: {
        preload: preload,
        create: create
      }
    };

    var game = new Phaser.Game(config)

    function preload() {
      // @ts-ignore
      this.load.setBaseURL('https://labs.phaser.io');

      // @ts-ignore
      this.load.image('sky', 'assets/skies/space3.png');
      // @ts-ignore
      this.load.image('logo', 'assets/sprites/phaser3-logo.png');
      // @ts-ignore
      this.load.image('red', 'assets/particles/red.png');
    }

    function create() {
      // @ts-ignore
      this.add.image(200, 150, 'sky');

      // @ts-ignore
      var particles = this.add.particles('red');

      var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
      });

      // @ts-ignore
      var logo = this.physics.add.image(100, 25, 'logo');

      logo.setScale(0.5)
      logo.setVelocity(20, 40);
      logo.setBounce(1, 1);
      logo.setCollideWorldBounds(true);

      emitter.startFollow(logo);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        <button onClick={showVideo}>Show Video</button>
        <button onClick={initPhaser}>Show Phaser</button>
      </IonContent>
    </IonPage>
  );
};

export default Home;
