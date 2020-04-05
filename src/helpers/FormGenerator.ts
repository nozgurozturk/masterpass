import * as $ from 'jquery'

export function generateForm<T> (inputs: T): JQuery<HTMLElement> {
  const form = $('<form style="display: none;" method="post"></form>')
  for (const input in inputs) {
    const name = input
    const value = inputs[input]
    form.append($(`<input type="hidden" name="${name}" value="${value}" >`))
  }
  return form
}
