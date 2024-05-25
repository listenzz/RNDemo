import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { withNavigationItem } from 'hybrid-navigation'
import CheckGroup from './checkbox/CheckBoxGroup'
import CheckLabel from './checkbox/CheckBoxLabel'
import GridView from './GridView'
import CheckBox from './checkbox/CheckBox'
import RadioGroup from './radio/RadioButtonGroup'
import RadioLabel from './radio/RadioLabel'
import RadioButton from './radio/RadioButton'
import { RadioButtonItem } from './radio/RadioButtonContext'

interface Item {
  label: string
  value: string
}

const langs = [
  { label: 'JavaScript', value: 'js' },
  { label: 'Java', value: 'java' },
  { label: 'OBJC', value: 'Objective-C' },
  { label: 'GoLang', value: 'go' },
  { label: 'Python', value: 'python' },
  { label: 'C#', value: 'C#' },
]

const platforms = [
  { label: 'Android', value: 'Android' },
  { label: 'iOS', value: 'iOS' },
  { label: 'React Native', value: 'React Native' },
  { label: 'Spring Boot', value: 'spring' },
]

const companies = [
  { label: '上市', value: '上市' },
  { label: '初创', value: '初创' },
  { label: '国企', value: '国企' },
  { label: '外企', value: '外企' },
]

const salaries: Array<RadioButtonItem<string | undefined>> = [
  { label: '10 - 15k', value: '15' },
  { label: '15 - 20k', value: '20' },
  { label: '20 - 25k', value: '25' },
  { label: '25 - 30k', value: '30' },
]

const edus: Array<RadioButtonItem<string | undefined>> = [
  { label: '大专', value: '大专' },
  { label: '本科', value: '本科' },
  { label: '研究生', value: '研究生' },
]

function LayoutAndState() {
  const [checkedLangs, setCheckedLangs] = useState<Item[]>([])
  const [checkedPlatforms, setCheckedPlatforms] = useState<Item[]>([])
  const [checkedCompanies, setCheckedCompanies] = useState<Item[]>([])
  const [salary, setSalary] = useState<RadioButtonItem<string | undefined>>()
  const [education, setEducation] = useState<RadioButtonItem<string | undefined>>()

  return (
    <View style={styles.container}>
      <Text style={styles.header}>你擅长的语言（多选）</Text>
      <CheckGroup checkedItems={checkedLangs} onItemsChecked={setCheckedLangs}>
        <GridView style={styles.grid}>
          {langs.map(item => (
            <CheckLabel key={item.label} item={item} style={styles.gridItem} />
          ))}
        </GridView>
      </CheckGroup>
      <Text style={styles.header}>你擅长的平台（多选）</Text>
      <CheckGroup checkedItems={checkedPlatforms} onItemsChecked={setCheckedPlatforms}>
        <GridView style={styles.grid} numOfRow={2}>
          {platforms.map(item => (
            <CheckLabel key={item.label} item={item} style={styles.gridItem} />
          ))}
        </GridView>
      </CheckGroup>
      <Text style={styles.header}>你期望的公司（多选）</Text>
      <CheckGroup checkedItems={checkedCompanies} onItemsChecked={setCheckedCompanies}>
        <View style={styles.row}>
          {companies.map(item => (
            <CheckBox key={item.label} item={item} style={styles.rowItem} />
          ))}
        </View>
      </CheckGroup>
      <Text style={styles.header}>你期望的薪资（单选）</Text>
      <RadioGroup checkedItem={salary} onItemChecked={setSalary}>
        <GridView style={styles.grid} numOfRow={4}>
          {salaries.map(item => (
            <RadioLabel key={item.label} item={item} style={styles.gridItem} />
          ))}
        </GridView>
      </RadioGroup>
      <Text style={styles.header}>你的学历（单选）</Text>
      <RadioGroup checkedItem={education} onItemChecked={setEducation}>
        <View style={styles.row}>
          {edus.map(item => (
            <RadioButton key={item.label} item={item} style={styles.rowItem} />
          ))}
        </View>
      </RadioGroup>
    </View>
  )
}

export default withNavigationItem({
  titleItem: {
    title: 'Layout 和 State 分离',
  },
})(LayoutAndState)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingLeft: 32,
    paddingRight: 32,
  },
  header: {
    color: '#222222',
    fontSize: 17,
    marginTop: 32,
  },
  grid: {
    marginTop: 8,
  },
  gridItem: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 12,
  },
  rowItem: {
    marginRight: 16,
  },
})
