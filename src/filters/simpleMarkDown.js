const markdownFlier = (val) => {
  return SimpleMDE.prototype.markdown(emoji.emojify(val, name => name))
}
import SimpleMDE from 'simplemde'
import emoji from 'node-emoji'

export default markdownFlier


