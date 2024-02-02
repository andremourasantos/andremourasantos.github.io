<template>
  <article>
    <section v-for="item in recommendationsInfo" ref="content" class="presentationCard" @touchstart="touchingStart($event)" @touchmove="touchingMoving" @touchend="changeContentViaSwipe($event)">
      <div class="header">
        <component :is="item.icon" />
        <div>
          <h2>{{ item.type }}</h2>
          <p v-if="item.type === 'Recomendações'">Via <a v-if="item.source === 'LinkedIn'" href="https://www.linkedin.com/in/andremourasantos/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="external nofollow noopener noreffer" title="Visualizar recomendação no LinkedIn">{{ item.source }}</a><span v-if="item.source !== 'LinkedIn'">{{ item.source }}</span>.</p>
        </div>
      </div>

      <div class="contentText">
        <p v-for="paragraph in item.text">"{{ paragraph }}"</p>
        <p v-if="item.type === 'Recomendações' && item.author !== null" class="recommendationAuthor"><strong>{{ item.author.name }}</strong>, {{
          item.author.job }}.</p>
      </div>
    </section>

    <div id="nav" ref="navIndicators">
      <div v-for="(item, index) in recommendationsInfo" class="nav_indicator" @click="changeContentViaNavIndicator($event)" :title="`Slide ${index + 1} de ${indicatorsArray?.length}`"></div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import { PhTrophy, PhStar, PhGlobeStand } from '@phosphor-icons/vue';

//data
//@ts-ignore
import recommendationsJSON from '@/data/recommendations.json';

export default defineComponent({
  name: 'PresentationCard',
  components: {PhTrophy, PhStar, PhGlobeStand},
  setup () {
    const recommendationsInfo = ref<PresentationCardInfo[]>(recommendationsJSON as PresentationCardInfo[]);
    const presentationInfoIndex = ref<number>(0);
    const presentationInfoTotal = ref<number>(recommendationsJSON.length - 1);

    //el refs
    const content = ref<HTMLElement[] | null>(null);
    const navIndicators = ref<HTMLDivElement | null>(null);
    const indicatorsArray = ref<HTMLDivElement[] | null>(null);

    onMounted(() => {
      if(navIndicators.value !== null){
        indicatorsArray.value = Array.from(navIndicators.value.childNodes).filter((el) => {return el.nodeName === 'DIV'}) as HTMLDivElement[];
      };
      
      switchActiveNavIndicator();
      switchActiveContent();

      //Change content via interval feature
      startswitchPresentationInfo = setInterval(() => {
        switchPresentationInfo();
      }, switchDelay);
    })

    onBeforeUnmount(() => {
      clearInterval(startswitchPresentationInfo);
    })

    //Change content functions
    let startswitchPresentationInfo:NodeJS.Timeout;
    let switchDelay:number = 10000;

    const switchPresentationInfo = (slideID?:number):void => {
      if(slideID !== undefined){
        presentationInfoIndex.value = slideID;
      } else if(presentationInfoIndex.value >= presentationInfoTotal.value) {
        presentationInfoIndex.value = 0;
      } else {
        presentationInfoIndex.value++;
      };

      switchActiveContent();
      switchActiveNavIndicator();
    };

    const switchActiveContent = ():void => {
      if(content.value === null){return};
      const elToShow = content.value[presentationInfoIndex.value];

      content.value.forEach(el => {el.style.display = 'none'});
      elToShow.style.display = 'flex';
      elToShow.querySelector('.contentText')?.scrollTo(0,0);
    };

    const switchActiveNavIndicator = ():void => {
      if(!indicatorsArray.value){return};
      
      const activeIndicator = indicatorsArray.value[presentationInfoIndex.value] as HTMLDivElement;

      indicatorsArray.value.forEach(el => {el.classList.remove('nav_indicator_active')});
      activeIndicator.classList.add('nav_indicator_active');
    };

    //Change content via navIndicator feature
    const changeContentViaNavIndicator = (e:Event) => {
      if(!indicatorsArray.value){return};
      clearInterval(startswitchPresentationInfo);

      const indicatorClicked = e.currentTarget as HTMLDivElement;
      const index = indicatorsArray.value.indexOf(indicatorClicked);

      switchPresentationInfo(index);

      startswitchPresentationInfo = setInterval(() => {
        switchPresentationInfo();
      }, switchDelay);
    };

    //Change content via swipe feature
    const initialX = ref<number>(0);
    const finalX = ref<number>(0);

    const touchingStart = (e:TouchEvent):void => {
      e.preventDefault();
      clearInterval(startswitchPresentationInfo);
      initialX.value = e.touches[0].clientX;
    };

    const touchingMoving = (e:TouchEvent):void => {
      finalX.value = e.touches[0].clientX;
    };

    const changeContentViaSwipe = (e:TouchEvent):void => {
      if(Math.abs(initialX.value - finalX.value) < 100){
        startswitchPresentationInfo = setInterval(() => {
          switchPresentationInfo();
        }, switchDelay);

        return;
      };
      clearInterval(startswitchPresentationInfo);

      if(!((initialX.value - finalX.value) > 0)){
        //Swipping Left-to-Right (show previous)
        presentationInfoIndex.value === 0 ? switchPresentationInfo(presentationInfoTotal.value) : switchPresentationInfo(presentationInfoIndex.value -= 1);
      } else {
        //Swipping Right-to-Left (show next)
        presentationInfoIndex.value === presentationInfoTotal.value ? switchPresentationInfo(0) : switchPresentationInfo(presentationInfoIndex.value += 1);
      }

      startswitchPresentationInfo = setInterval(() => {
        switchPresentationInfo();
      }, switchDelay);
    };

    return {
      recommendationsInfo,
      content,
      navIndicators,
      indicatorsArray,
      changeContentViaNavIndicator,
      touchingStart,
      touchingMoving,
      changeContentViaSwipe
    }
  }
})
</script>

<style scoped>
  article {
    display: flex;
    flex-direction: column;
    height: 320px;
    width: 100%;
    max-width: 600px;
    padding: 24px;
    border-radius: 24px;
    background-color: var(--colors-background);
    box-shadow: var(--neumorphism-inner_shadow);
  }

    @media screen and (min-width: 425px) {
      article {
        height: 240px;
      }
    }

  .presentationCard {
    display: none;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 16px;
  }

  .header h2 {
    font-size: 18px;
  }

  .header p {
    font-size: 16px;
  }

  .contentText {
    height: 100%;
    overflow: auto;
  }

  .contentText p {
    margin-bottom: 8px;
  }
  
  p.recommendationAuthor {
    text-align: right;
  }

  @keyframes contentShowingUp {
    0% {}
    100% {}
  }

  @keyframes contentDissapearing {
    0% {}
    100% {}
  }

  #nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    height: 20px;
  }

  .nav_indicator {
    height: 5px;
    width: 20px;
    border-radius: 10px;
    background-color: hsl(0, 0%, 73%);
    transition: 500ms;
    cursor: pointer;
  }

  .nav_indicator_active {
    background-color: hsl(0, 0%, 33%);
  }
</style>