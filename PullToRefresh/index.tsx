import React from 'react'
import { Animated, Image, StyleSheet } from 'react-native'
import { withNavigationItem } from 'hybrid-navigation'
import PagerView from 'react-native-pager-view'
import TabBar from '../components/TabBar'
import usePagerView from '../components/TabBar/usePagerView'
import { Twitter, TwitterFlatList } from '../components/twitter'
import { NestedScrollView, NestedScrollViewHeader } from '@sdcx/nested-scroll'

const AnimatedPagerView = Animated.createAnimatedComponent<typeof PagerView>(PagerView)

const pages = ['FlatList', 'FlashList']

export function PullToRefreshScreen() {
  const {
    pagerRef,
    setPage,
    page,
    position,
    offset,
    isIdle,
    scrollState,
    onPageScroll,
    onPageSelected,
    onPageScrollStateChanged,
  } = usePagerView()

  return (
    <NestedScrollView style={styles.coordinator}>
      <NestedScrollViewHeader stickyHeaderBeginIndex={1}>
        <Image source={require('assets/cover.webp')} style={styles.image} resizeMode="cover" />
        <TabBar
          tabs={pages}
          onTabPress={setPage}
          position={position}
          offset={offset}
          page={page}
          isIdle={isIdle}
          scrollState={scrollState}
        />
      </NestedScrollViewHeader>
      <AnimatedPagerView
        ref={pagerRef}
        style={styles.pager}
        overdrag={true}
        overScrollMode="always"
        onPageScroll={onPageScroll}
        onPageSelected={onPageSelected}
        onPageScrollStateChanged={onPageScrollStateChanged}>
        <TwitterFlatList />
        <Twitter />
      </AnimatedPagerView>
    </NestedScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
  },
  coordinator: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#0000FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 160,
    width: '100%',
  },
  text: {
    paddingVertical: 20,
    fontSize: 18,
    color: '#FFFFFF',
  },
  pager: {
    height: '100%',
  },
})

export default withNavigationItem({
  titleItem: {
    title: 'PullToRresh',
  },
})(PullToRefreshScreen)
