import React, { useState, useEffect } from 'react'
import {
  setArray,
  setIsPlaying,
  setReset
} from '@/apps/sorting-visualizer/store/sorting-visualizer.slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  convertArrayStringToArray,
  convertInputToArrayString,
  getRndmNumInRange
} from '@/apps/sorting-visualizer/helpers/array-helpers'

import classes from './controls.module.scss'

type SortFunction = () => void

function ArrayInput () {
  const dispatch = useAppDispatch()
  const array = useAppSelector(state => state.sortViz.array)
  const [input, setInput] = useState(array.join(', '))
  // const [sortingOptionsVisible, setSortingOptionsVisible] = useState(false)

  useEffect(() => {
    dispatch(setIsPlaying(false))
    dispatch(setReset())
  }, [array, dispatch])

  const onRandomize = () => {
    const newInput = Array.from(new Array(getRndmNumInRange(10, 40)), () =>
      getRndmNumInRange()
    )
    setInput(newInput.join(', '))
    dispatch(setArray(newInput))
  }

  const handleSortAscending = () => {
    const sortedAscending: number[] = input
      .split(', ')
      .map(num => parseInt(num, 10))
      .sort((a, b) => a - b)
    setInput(sortedAscending.join(', '))
    dispatch(setArray(sortedAscending))
  }

  const handleSortDescending = () => {
    const sortedDescending: number[] = input
      .split(', ')
      .map(num => parseInt(num, 10))
      .sort((a, b) => b - a)
    setInput(sortedDescending.join(', '))
    dispatch(setArray(sortedDescending))
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAsStr = convertInputToArrayString(e.target.value)
    setInput(inputAsStr)
    dispatch(setArray(convertArrayStringToArray(inputAsStr)))
  }

  const sortOptions: { [key: string]: SortFunction } = {
    ascending: handleSortAscending,
    descending: handleSortDescending
  }

  return (
    <div className={classes.numbers}>
      <button className={classes.rndmBtn} onClick={onRandomize}>
        Randomize
      </button>
      {/* <div className={classes.buttonContainer}> */}
          <select
            className={classes.buttonContainer}
            onChange={e => {
              let sortOption = e.target.value
              if (sortOptions[sortOption]) {
                sortOptions[sortOption]()
              }
            }}
          >
            <option value=''>Sort </option>
            <option value='ascending'>Ascending</option>
            <option value='descending'>Descending</option>
          </select>
      {/* </div> */}

      <input
        className={classes.arrayInput}
        type='text'
        placeholder='Numbers to sort (comma separate - max 3 digits)'
        value={input}
        onChange={onChange}
      />
    </div>
  )
}

export default ArrayInput