import React, { Component } from 'react'
import PropTypes from 'prop-types'
import copyToClipboard from 'copy-to-clipboard'
import Tooltip from '../tooltip'

class CopyComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      copied: false,
    }
  }

  static propTypes = {
    style: PropTypes.object,
    tooltipPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
  }

  onClick (event, value) {
    event.preventDefault()
    event.stopPropagation()
    copyToClipboard(value)
    this.debounceRestore()
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  renderTooltip (message, position, children) {
    return (
      <Tooltip
        title={message}
        position={position}
      >
      {children}
      </Tooltip>
    )
  }

  debounceRestore () {
    this.setState({ copied: true })
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.setState({ copied: false })
    }, 850)
  }
}

module.exports = CopyComponent
