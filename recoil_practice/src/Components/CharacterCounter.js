import { selector, useRecoilState, useRecoilValue } from "recoil";
import { textState } from "../Atoms/TodoAtom";

function CharacterCounter() {
    return (
      <div>
        <TextInput />
        <CharacterCount />
      </div>
    );
  }
  
  const charCountState = selector({
    key: 'charCountState', // unique ID (with respect to other atoms/selectors)
    get: ({get}) => {
      const text = get(textState);
  
      return text.length;
    },
  });

  function CharacterCount() {
    const count = useRecoilValue(charCountState);
  
    return <>Character Count: {count}</>;
  }

  function TextInput() {
    const [text, setText] = useRecoilState(textState);
  
    const onChange = (event) => {
      setText(event.target.value);
    };
  
    return (
      <div>
        <input type="text" value={text} onChange={onChange} />
        <br />
        Echo: {text}
      </div>
    );
  }

export default CharacterCounter