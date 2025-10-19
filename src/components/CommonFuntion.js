export  const imgUrl = 'https://images.nexonpackaging.com/'


export function formatString(input) {
    return decodeURIComponent(input).toLowerCase().replace(/\s+/g, "-");
}

export const convertHyphenToSpace = (str) => {
    return str.includes("-") ? str.replace(/-/g, " ") : str;
  };
