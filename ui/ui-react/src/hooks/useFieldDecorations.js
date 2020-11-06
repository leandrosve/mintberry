
const useFieldDecorations = (meta, isActive = false) => {
    const isTouched = meta && meta.touched;
    const shouldDisplayError = isTouched && meta.error;
    const severity = isActive ? (meta && meta.error ? "info" : "success") : (shouldDisplayError ? "danger" : (isTouched ? "success" : null));
    return [severity, isTouched ? meta.error : null]
}

export default useFieldDecorations;