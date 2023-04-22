import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import PagerView from 'react-native-pager-view'
import usePagerView from '../components/TabBar/usePagerView'
import TabBar from '../components/TabBar'
import LangPage from './LangPage'
import ScrollBar from '../components/TabBar/ScrollBar'

const AnimatedPagerView = Animated.createAnimatedComponent<typeof PagerView>(PagerView)

const langs = ['JavaScript', 'Golang', 'Objective-C', 'Python', 'Swift', 'Java', 'Ruby']

export default function TabBarDemo() {
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
    <View style={styles.container}>
      <ScrollBar style={styles.scrollbar} page={page}>
        <TabBar
          style={styles.tabbar}
          tabStyle={styles.tab}
          tabs={langs}
          onTabPress={setPage}
          position={position}
          offset={offset}
          page={page}
          isIdle={isIdle}
          scrollState={scrollState}
        />
      </ScrollBar>
      <AnimatedPagerView
        ref={pagerRef}
        style={styles.pager}
        overdrag={true}
        overScrollMode="always"
        onPageScroll={onPageScroll}
        onPageSelected={onPageSelected}
        onPageScrollStateChanged={onPageScrollStateChanged}>
        {langs.map(lang => (
          <LangPage key={lang} language={lang} />
        ))}
      </AnimatedPagerView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollbar: {
    height: 48,
    flexGrow: 0,
  },
  tabbar: {
    height: '100%',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  tab: {
    paddingHorizontal: 16,
  },
  pager: {
    flex: 1,
  },
})
