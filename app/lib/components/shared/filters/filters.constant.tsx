import { FILTERS_TYPE } from '@/lib/constants/filters'
import React from 'react'

export const FILTERS_TYPE_COMPONENT = {
  [FILTERS_TYPE.RANGE]: () => <p>'Range'</p>,
}