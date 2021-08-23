import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { AdMob, RewardAdOptions, AdLoadInfo, RewardAdPluginEvents, AdMobRewardItem } from '@capacitor-community/admob';

import './Home.css';

const Home: React.FC = () => {

  const initAdmob = () => {
    AdMob.initialize({
      requestTrackingAuthorization: true,
      // testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      initializeForTesting: true,
    });
  }

  const prepareAdmobVideo = () => {
    AdMob.addListener(RewardAdPluginEvents.Loaded, (info: AdLoadInfo) => {
      // Subscribe prepared rewardVideo
    });
  
    AdMob.addListener(RewardAdPluginEvents.Rewarded, (rewardItem: AdMobRewardItem) => {
      // Subscribe user rewarded
      console.log(rewardItem);
    });
  
    const options: RewardAdOptions = {
      adId: 'appId',
      isTesting: true
      // npa: true
      // ssv: {
      //   userId: "A user ID to send to your SSV"
      //   customData: JSON.stringify({ ...MyCustomData })
      //}
    };

    AdMob.prepareRewardVideoAd(options);
  }

  initAdmob();
  prepareAdmobVideo();

  const showVideo = () => {
    AdMob.showRewardVideoAd()
      .then((rewardItem) => console.log('>> rewardItem', rewardItem));
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
      </IonContent>
    </IonPage>
  );
};

export default Home;
