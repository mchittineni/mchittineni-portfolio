<template>
  <div class="tablewrap">
    <table>
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key" scope="col">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="row[rowKey]"
          :class="['row', { selectable, selected: selected === row[rowKey] }]"
          :tabindex="selectable ? 0 : undefined"
          :role="selectable ? 'button' : undefined"
          :aria-expanded="selectable ? selected === row[rowKey] : undefined"
          @click="selectable && emit('select', row[rowKey])"
          @keydown.enter.prevent="selectable && emit('select', row[rowKey])"
          @keydown.space.prevent="selectable && emit('select', row[rowKey])"
        >
          <td v-for="(col, i) in columns" :key="col.key" :class="{ name: i === 0 }">
            <span v-if="i === 0 && selectable" class="caret" aria-hidden="true">
              {{ selected === row[rowKey] ? '▾' : '▸' }}
            </span>
            <slot :name="col.key" :row="row">{{ row[col.key] }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  defineProps({
    columns: { type: Array, required: true },
    rows: { type: Array, required: true },
    rowKey: { type: String, default: 'name' },
    selectable: { type: Boolean, default: false },
    selected: { type: [String, null], default: null },
  })

  const emit = defineEmits(['select'])
</script>

<style scoped>
  .tablewrap {
    overflow-x: auto;
    border: 1px solid var(--border);
    border-radius: var(--radius-chrome);
    background: var(--chrome);
  }
  table {
    border-collapse: collapse;
    width: 100%;
    font-family: var(--mono);
    font-size: 0.82rem;
    font-variant-numeric: tabular-nums;
  }
  th {
    text-align: left;
    font-weight: 500;
    color: var(--text-dim);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.66rem;
    padding: 0.65rem 0.9rem;
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
  }
  td {
    padding: 0.7rem 0.9rem;
    border-bottom: 1px solid var(--border);
    color: var(--text-soft);
    vertical-align: top;
  }
  tbody tr:last-child td {
    border-bottom: 0;
  }
  td.name {
    color: var(--text);
  }
  .caret {
    color: var(--text-dim);
    font-size: 0.7rem;
    margin-right: 0.35rem;
  }
  .row.selectable {
    cursor: pointer;
    transition: background 0.12s ease;
  }
  .row.selectable:hover td {
    background: var(--surface-2);
  }
  .row.selected td {
    background: rgba(129, 140, 248, 0.1);
  }
  .row.selected td.name {
    color: var(--accent);
  }
</style>
