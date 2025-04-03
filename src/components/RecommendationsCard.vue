<template>
  <article v-if="isLoading">
    <section class="recommendationsCard loadingSkeleton">
      <div class="header">
        <div class="skeletonIcon icon"></div>
        <div>
          <h2>Carregando...</h2>
          <p>Carregando...</p>
        </div>
      </div>

      <div class="contentText">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, minima.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo pariatur ut accusantium molestias rerum aut.</p>
        <p class="recommendationAuthor"><strong>Lorem</strong>, ipsum...</p>
      </div>
    </section>

    <div class="nav" ref="navIndicators">
      <div v-for="(item, index) in numberOfNavIndicatorsSkeletons" class="nav_indicator"></div>
    </div>
  </article>
  
  <article v-if="!isLoading">
    <section v-for="item in recommendationsInfo" ref="content" class="recommendationsCard" @touchstart="touchingStart($event)" @touchmove="touchingMoving" @touchend="changeContentViaSwipe($event)">
      <div class="header">
        <component class="icon" :is="item.icon" />
        <div>
          <h2>Recomendação</h2>
          <p>Via <a v-if="item.source === 'LinkedIn'" href="https://www.linkedin.com/in/andremourasantos/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="external nofollow noopener noreffer" title="Visualizar recomendação no LinkedIn">{{ item.source }}</a><span v-if="item.source !== 'LinkedIn'">{{ item.source }}</span>.</p>
        </div>
      </div>

      <div class="contentText">
        <p v-for="paragraph in item.text">"{{ paragraph }}"</p>
        <p class="recommendationAuthor"><strong>{{ item.author.name }}</strong>, {{
          item.author.job }}.</p>
      </div>
    </section>

    <div class="nav" ref="navIndicators">
      <div v-for="(item, index) in recommendationsInfo" class="nav_indicator" @click="changeContentViaNavIndicator($event)" :title="`Slide ${index + 1} de ${indicatorsArray?.length}`"></div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, onBeforeUnmount, onBeforeMount, watch, onMounted } from 'vue';
import { PhTrophy } from '@phosphor-icons/vue';

// composables
import { getRecommendationsFromCloud } from '@/composables/data-base';
import { getNumberOfSkeletonsForNavIndicatorOnRecommendationsCard } from '@/composables/general';

export default defineComponent({
  name: 'RecommendationsCard',
  components: {PhTrophy},
  setup () {
    const isLoading = ref<boolean>(true);
    const recommendationsInfo = ref<RecommendationsCard[] | null>(null);
    const numberOfNavIndicatorsSkeletons = ref<number>(6);
    const presentationInfoIndex = ref<number>(0);
    const presentationInfoTotal = ref<number>(0);

    //el refs
    const content = ref<HTMLElement[] | null>(null);
    const navIndicators = ref<HTMLDivElement | null>(null);
    const indicatorsArray = ref<HTMLDivElement[] | null>(null);

    onBeforeMount(async () => {
      await getRecommendationsFromCloud()
        .then(res => {
          isLoading.value = false;
          recommendationsInfo.value = res;
          presentationInfoTotal.value = res.length - 1;
        });
      
      const navIndicatorSkeletons:number = getNumberOfSkeletonsForNavIndicatorOnRecommendationsCard();

      if(navIndicatorSkeletons <= 7) {
        numberOfNavIndicatorsSkeletons.value = navIndicatorSkeletons;
      } else {
        numberOfNavIndicatorsSkeletons.value = 6;
      }
    })

    onMounted(() => {
      
    })

    watch(content, () => {
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
      if(Math.abs(initialX.value - finalX.value) < 50){
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
      isLoading,
      numberOfNavIndicatorsSkeletons,
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
  @import '../assets/styles/loading.css';

  .loadingSkeleton {
    display: flex !important;
  }
  
  .skeletonIcon {
    height: 36px;
    width: 36px;
  }

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

      .skeletonIcon {
        height: 32px;
        width: 32px;
      }
    }

  .recommendationsCard {
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

  .header .icon {
    aspect-ratio: 1/1;
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

  .nav {
    display: flex;
    flex-wrap: wrap;
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