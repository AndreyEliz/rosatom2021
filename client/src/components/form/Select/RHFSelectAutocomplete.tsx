import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import { Controller } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface IRHFSelectAutocompleteProps extends FormControlProps {
    name: string,
    label: string,
    control: any,
    defaultValue: any,
    options: string[]
}

const RHFSelectAutocomplete: React.FC<IRHFSelectAutocompleteProps> = ({
    name,
    label,
    control,
    defaultValue,
    variant,
    children,
    options,
    ...props
}) => {
    return (
    <FormControl {...props}>
        <Controller
            render={(props:any) =>
                <Autocomplete
                    {...props}
                    options={options}
                    autoHighlight
                    onChange={(e, data) => props.onChange(data)}
                    multiple
                    filterSelectedOptions
                    getOptionLabel={(option:string) => option}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
                            variant={variant}
                            fullWidth
                        />
                    )}
                    />
                }
            name={name}
            control={control}
            defaultValue={defaultValue}
        />
    </FormControl>
    );
};
export default RHFSelectAutocomplete;