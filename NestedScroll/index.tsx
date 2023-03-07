import { withNavigationItem } from 'hybrid-navigation'
import React, { useState } from 'react'
import { Animated, Image, StyleSheet } from 'react-native'
import { NestedScrollView, NestedScrollViewHeader } from '@sdcx/nested-scroll'
import PagerView from 'react-native-pager-view'
import TabBar from '../components/TabBar'
import usePagerView from '../components/TabBar/usePagerView'
import Contacts from '../components/contacts/Contacts'
import Albums from '../components/Albums'
import Article from '../components/Article'
import Profile from '../components/Profile'
import { PullToRefresh } from '@sdcx/pull-to-refresh'

const AnimatedPagerView = Animated.createAnimatedComponent<typeof PagerView>(PagerView)

const pages = ['Contacts', 'Albums', 'Article', 'Profile']

export function NestedScrollPagerViewStickyHeader() {
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

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  return (
    <PullToRefresh refreshing={refreshing} onRefresh={onRefresh}>
      <NestedScrollView style={styles.coordinator}>
        <NestedScrollViewHeader stickyHeaderBeginIndex={1}>
          <Image source={require('assets/cover.webp')} style={styles.image} resizeMode="cover" />
          <TabBar
            tabs={pages}
            onTabPress={setPage}
            position={position}
            offset={offset}
            scrollState={scrollState}
            page={page}
            isIdle={isIdle}
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
          <Contacts />
          <Albums />
          <Article />
          <Profile />
        </AnimatedPagerView>
      </NestedScrollView>
    </PullToRefresh>
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
    title: 'NestedScroll',
  },
})(NestedScrollPagerViewStickyHeader)
